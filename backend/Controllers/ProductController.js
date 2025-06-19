const Product = require("../Models/Product");
const mongoose = require("mongoose");

// Helper function to transform incoming product data
const transformProductData = (product) => {
  return {
    ...product,
    price: parseFloat(product.price.replace(/[^0-9.-]+/g, "")),
    originalPrice: parseFloat(product.originalPrice.replace(/[^0-9.-]+/g, "")),
    discount: parseInt(product.discount.replace(/[^0-9-]+/g, "").replace("-", "")),
    description: product.description || `${product.name} - ${product.material} ${product.category} furniture`,
    code: product.code || generateProductCode(product.name, product.category)
  };
};

// Helper function to generate product code
const generateProductCode = (name, category) => {
  const namePart = name.split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .substring(0, 3);
  
  const categoryPart = category.split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2);
    
  return `${namePart}${categoryPart}${Math.floor(100 + Math.random() * 900)}`;
};

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: products.length,
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
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid product ID format",
        receivedId: id
      });
    }

    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found"
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

// @desc    Add a new product
// @route   POST /api/products
// @access  Public
exports.addProduct = async (req, res) => {
  try {
    const transformedProduct = transformProductData(req.body);
    const newProduct = new Product(transformedProduct);
    const savedProduct = await newProduct.save();
    
    res.status(201).json({
      success: true,
      data: savedProduct
    });
  } catch (error) {
    console.error('Add product error:', error);
    
    // Handle duplicate key error (for unique code)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: "Duplicate product code",
        details: "A product with this code already exists"
      });
    }
    
    res.status(400).json({ 
      success: false,
      error: "Error adding product",
      details: error.message 
    });
  }
};

// @desc    Add multiple products
// @route   POST /api/products/bulk
// @access  Public
exports.addBulkProducts = async (req, res) => {
  try {
    if (!Array.isArray(req.body) || req.body.length === 0) {
      return res.status(400).json({
        success: false,
        error: "Invalid request body",
        details: "Expected an array of products"
      });
    }

    const transformedProducts = req.body.map(product => 
      transformProductData(product)
    );

    const savedProducts = await Product.insertMany(transformedProducts, {
      ordered: false // Continue inserting even if some documents fail
    });

    res.status(201).json({
      success: true,
      count: savedProducts.length,
      data: savedProducts
    });
  } catch (error) {
    console.error('Add bulk products error:', error);
    
    // Handle bulk write errors
    if (error.writeErrors) {
      const errors = error.writeErrors.map(err => ({
        index: err.index,
        code: err.code,
        message: err.errmsg
      }));
      
      return res.status(207).json({ // 207 Multi-Status
        success: false,
        error: "Partial success",
        insertedCount: error.result?.nInserted || 0,
        errors: errors,
        details: "Some products failed to insert"
      });
    }
    
    res.status(400).json({
      success: false,
      error: "Error adding products",
      details: error.message
    });
  }
};