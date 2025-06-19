const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true
  },
  description: {
    type: String,
    required: [true, "Product description is required"]
  },
  price: {
    type: Number,
    required: [true, "Product price is required"]
  },
  originalPrice: {
    type: Number,
    required: [true, "Original price is required"]
  },
  discount: {
    type: Number,
    default: 0
  },
  image: {
    type: String,
    required: [true, "Product image is required"]
  },
  color: {
    type: String,
    required: [true, "Product color is required"]
  },
  inStock: {
    type: Boolean,
    default: true
  },
  category: {
    type: String,
    required: [true, "Product category is required"]
  },
  material: {
    type: String,
    required: [true, "Product material is required"]
  },
  code: {
    type: String,
    required: [true, "Product code is required"],
    unique: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Product", productSchema);