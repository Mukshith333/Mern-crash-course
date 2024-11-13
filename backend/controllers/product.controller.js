import Product from "../models/product.model.js";
import mongoose from "mongoose";

const GetAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(201).json({ success: true, data: products });
  } catch (error) {
    console.log("An error message :" + error.message);
    res
      .status(201)
      .json({ success: false, message: "fetching products failed" });
  }
};

const CreateProducts = async (req, res) => {
  const product = req.body;
  if (validateProduct(product)) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newProduct = new Product(product);
  try {
    await newProduct.save();
    return res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.log("Error message:" + error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const UpdatedProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Specific Instance not found" });
  }

  try {
    const UpdatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: UpdatedProduct });
  } catch (error) {
    console.log("An error in updation:" + error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const DeleteProducts = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ success: false, message: "Specific Instance not found" });
    }
    const product = await Product.findById(id);
    if (product != null) {
      await Product.deleteOne(product);
      return res
        .status(200)
        .json({ success: true, message: "Product delete successfully" });
    }
  } catch (error) {
    console.log("Error message:" + error.message);
    return res
      .status(404)
      .json({ success: true, message: "Instance not found" });
  }
};

function validateProduct(product) {
  return !product.name || !product.price || !product.image ? true : false;
}

export { GetAllProducts, CreateProducts, UpdatedProduct, DeleteProducts };
