const Product = require("../Models/Product");

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Add a new product (optional)
exports.addProduct = async (req, res) => {
  const { name, price, originalPrice, discount, image, color, inStock, category, material } = req.body;

  const newProduct = new Product({ name, price, originalPrice, discount, image, color, inStock, category, material });

  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: "Error adding product" });
  }
};
// exports.addBulkProducts = async (req, res) => {
//     const products = req.body; // Expecting an array of products
  
//     try {
//       const result = await Product.insertMany(products);
//       res.status(201).json(result); // Return the inserted products
//     } catch (error) {
//       res.status(400).json({ message: "Error adding products", error });
//     }
//   };