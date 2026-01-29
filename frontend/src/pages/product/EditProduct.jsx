import React, { useEffect, useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router";
import Input from "../../components/Input";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";
import config from "../../config";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { apiBaseUrl } = config;
  const [apiErrors, setApiErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const schema = Joi.object({
    productName: Joi.string().min(3).max(30).required(),
    productPrice: Joi.number().positive().precision(2).required(),
    productType: Joi.string().min(3).max(30).required(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: joiResolver(schema) });

  useEffect(() => {
    // fetch product details
    axios
      .get(`${apiBaseUrl}/products/${id}`)
      .then((res) => {
        const p = res.data.data;
        setValue("productName", p.name);
        setValue("productPrice", p.price);
        setValue("productType", p.type);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id, apiBaseUrl, setValue]);

  const onSubmit = (product) => {
    axios
      .put(`${apiBaseUrl}/products/${id}`, product)
      .then((response) => {
        setApiErrors([]);
        setSuccessMessage(response.data.message);
        // optionally navigate back
        navigate("/products");
      })
      .catch((error) => {
        const errs = error?.response?.data?.errors ||
          (error?.response?.data?.message && [error.response.data.message]) || [
            error.message,
          ];
        setApiErrors(errs);
      });
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-8">
          <h2>Edit Product {id}</h2>
          {apiErrors.length > 0 && (
            <div className="alert alert-danger mt-2">
              <ul className="mb-0">
                {apiErrors.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </div>
          )}

          {successMessage && (
            <div className="alert alert-success mt-2">{successMessage}</div>
          )}
        </div>

        <div className="col-md-4 text-end">
          <NavLink to="/products">Back</NavLink>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row mt-3">
          <div className="col-md-6 offset-md-3">
            <div className="row g-2">
              <div className="col-md-12">
                <Input
                  label="Product Name"
                  name="productName"
                  type="text"
                  {...register("productName")}
                  errors={errors}
                />
              </div>
              <div className="col-md-12">
                <Input
                  label="Product Price"
                  name="productPrice"
                  type="number"
                  required
                  {...register("productPrice")}
                  errors={errors}
                />
              </div>
              <div className="col-md-12">
                <Input
                  label="Product Type"
                  name="productType"
                  type="text"
                  {...register("productType")}
                  errors={errors}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6"></div>
              <div className="col-md-6 text-end">
                <button type="submit" className="btn btn-primary">
                  Update Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
