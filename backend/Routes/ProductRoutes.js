const express = require("express");
const { 
  getProducts,
  getProductById,
  addProduct, 
  addBulkProducts
} = require("../controllers/ProductController");

const router = express.Router();

// GET /api/product
router.get("/", getProducts);

// GET /api/product/:id
router.get("/:id", getProductById);

// POST /api/product
router.post("/", addProduct);

// POST /api/product/bulk
router.post("/bulk", addBulkProducts);

module.exports = router;