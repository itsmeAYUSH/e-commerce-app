const Product = require("../models/Product");
const mongoose = require("mongoose");

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      error: "Error fetching products",
      details: error.message
    });
  }
};

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // More detailed logging
    console.log('Fetching product with ID:', id);
    console.log('Is valid ObjectId?', mongoose.Types.ObjectId.isValid(id));

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid product ID format",
        receivedId: id
      });
    }

    const product = await Product.findById(id);
    
    if (!product) {
      // Check if any products exist at all
      const count = await Product.countDocuments();
      console.log(`Total products in DB: ${count}`);
      
      return res.status(404).json({
        success: false,
        error: "Product not found",
        suggestion: count === 0 ? "Database appears empty" : "ID doesn't match any products"
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Detailed error:', error);
    res.status(500).json({
      success: false,
      error: "Server error",
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// Add a new product (optional)
exports.addProduct = async (req, res) => {
  const {
    name,
    price,
    originalPrice,
    discount,
    image,
    color,
    inStock,
    category,
    material,
    code,
  } = req.body;

  try {
    const newProduct = new Product({
      name,
      price,
      originalPrice,
      discount,
      image,
      color,
      inStock,
      category,
      material,
      code,
    });

    const savedProduct = await newProduct.save();
    console.log('New product saved:', savedProduct);
    
    res.status(201).json({
      success: true,
      data: savedProduct
    });
  } catch (error) {
    console.error('Add product error:', error);
    res.status(400).json({ 
      success: false,
      error: "Error adding product",
      details: error.message 
    });
  }
};

exports.addBulkProducts = async (req, res) => {
  try {
    const products = req.body;
    const savedProducts = await Product.insertMany(products);
    res.status(201).json({
      success: true,
      data: savedProducts
    });
  } catch (error) {
    console.error('Add bulk products error:', error);
    res.status(400).json({
      success: false,
      error: "Error adding products",
      details: error.message
    });
  }
};
