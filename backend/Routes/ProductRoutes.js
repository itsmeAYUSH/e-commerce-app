// routes/productRoutes.js
const express = require("express");
const { getAllProducts, addProduct,addBulkProducts } = require("../Controllers/ProductController");

const router = express.Router();

// Define routes
router.get("/", getAllProducts);
router.post("/", addProduct); // Optional: for adding products
router.post("/bulk", addBulkProducts); // New route for bulk insertion

module.exports = router;