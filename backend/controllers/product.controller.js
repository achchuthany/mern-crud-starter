import db from "../models/index.js";
const { Product } = db;
import Joi from "joi";

export async function getAllProducts(req, res) {
  try {
    const products = await Product.findAll();
    return res.json({ success: true, data: products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export async function getProductById(req, res) {
  const { id } = req.params;

  //validate the input using joi schema
  const schema = Joi.object({
    id: Joi.number().integer().positive().required(),
  });
  const { error } = schema.validate({ id }, { abortEarly: false });
  if (error) {
    const errors = error.details.map((d) => d.message);
    return res.status(400).json({ success: false, errors });
  }

  //fetch the product
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: `Product ${id} not found` });
    }
    return res.json({ success: true, data: product });
  } catch (error) {
    console.error("Error fetching product:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export async function createProduct(req, res) {
  const { productName, productPrice, productType } = req.body;

  //validate the input using joi schema
  const schema = Joi.object({
    productName: Joi.string().min(3).required(),
    productPrice: Joi.number().positive().required(),
    productType: Joi.string().min(3).required(),
  });

  const { error } = schema.validate(
    { productName, productPrice, productType },
    { abortEarly: false },
  );
  if (error) {
    const errors = error.details.map((d) => d.message);
    return res.status(400).json({ success: false, errors });
  }

  //create the product
  try {
    const product = await Product.create({
      name: productName,
      price: productPrice,
      type: productType,
    });
    return res.status(201).json({ success: true, data: product });
  } catch (error) {
    console.error("Error creating product:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export async function updateProduct(req, res) {
  const { id } = req.params;
  const { productName, productPrice, productType } = req.body;

  //validate the input using joi schema
  const schema = Joi.object({
    id: Joi.number().integer().positive().required(),
    productName: Joi.string().min(3).required(),
    productPrice: Joi.number().positive().required(),
    productType: Joi.string().min(3).required(),
  });
  const { error } = schema.validate(
    { id, productName, productPrice, productType },
    { abortEarly: false },
  );
  if (error) {
    const errors = error.details.map((d) => d.message);
    return res.status(400).json({ success: false, errors });
  }

  //update the product
  try {
    await Product.update(
      { name: productName, price: productPrice, type: productType },
      { where: { id } },
    );
    return res.json({
      success: true,
      message: `Product ${productName} updated`,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export async function deleteProduct(req, res) {
  const { id } = req.params;

  //validate the input using joi schema
  const schema = Joi.object({
    id: Joi.number().integer().positive().required(),
  });
  const { error } = schema.validate({ id }, { abortEarly: false });
  if (error) {
    const errors = error.details.map((d) => d.message);
    return res.status(400).json({ success: false, errors });
  }

  //delete the product
  try {
    await Product.destroy({ where: { id } });
    return res.json({ success: true, message: `Product ${id} deleted` });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}
