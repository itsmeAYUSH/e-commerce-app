const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: String,
  originalPrice: String,
  discount: String,
  image: String,
  color: String,
  inStock: Boolean,
  category: String,
  material: String,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;