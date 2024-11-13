import express from "express";
import {
  GetAllProducts,
  CreateProducts,
  UpdatedProduct,
  DeleteProducts,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/GetAllProducts", GetAllProducts);

router.post("/CreateProducts", CreateProducts);

router.put("/UpdateProducts/:id", UpdatedProduct);

router.delete("/DeleteProducts/:id", DeleteProducts);

export default router;
