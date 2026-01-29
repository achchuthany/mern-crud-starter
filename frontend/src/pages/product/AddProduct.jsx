import React, { useState } from "react";
import { NavLink } from "react-router";
import Input from "../../components/Input";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";
import config from "../../config";

const AddProduct = () => {
  const { apiBaseUrl } = config;
  //validation schema
  const schema = Joi.object({
    productName: Joi.string().min(3).max(30).required(),
    productPrice: Joi.number().positive().precision(2).required(),
    productType: Joi.string().min(3).max(30).required(),
  });

  //react hook form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: joiResolver(schema) });

  //state to hold api errors
  const [apiErrors, setApiErrors] = useState([]);
  //state to hold success message
  const [successMessage, setSuccessMessage] = useState("");

  //form submit handler
  const onSubmit = (product) => {
    axios
      .post(`${apiBaseUrl}/products`, product)
      .then((response) => {
        reset();
        setApiErrors([]);
        setSuccessMessage(response.data.data.name + " added successfully!");
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
          <h2>Add Product</h2>
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
                  label="Product Type/Category"
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
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
