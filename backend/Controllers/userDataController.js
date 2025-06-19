const User  = require('../Models/User');
const Product = require('../Models/Product');
const mongoose = require('mongoose');

// @desc    Add/Remove product to/from favorites
// @route   POST /api/user/favorites/:productId
// @access  Private
const toggleFavorite = async (req, res) => {
  try {
    const { productId } = req.params;
    
    if (!req.user || !req.user.id) {
      console.error('User not authenticated properly:', req.user);
      return res.status(401).json({
        success: false,
        message: 'User not authenticated properly'
      });
    }

    const userId = req.user.id;

    console.log('Toggle favorite request:', {
      productId,
      userId,
      userObject: req.user
    });

    // Validate productId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID format'
      });
    }

    // Convert string IDs to ObjectIds
    const productObjectId = new mongoose.Types.ObjectId(productId);
    const userObjectId = new mongoose.Types.ObjectId(userId);

    // Check if product exists
    const product = await Product.findById(productObjectId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Find user and validate
    const user = await User.findById(userObjectId);
    if (!user) {
      console.error('User not found:', userId);
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    console.log('Current user favorites:', user.favorites);

    // Convert favorites to ObjectIds for comparison
    const favoriteIndex = user.favorites.findIndex(id => 
      id.equals(productObjectId)
    );

    console.log('Favorite index:', favoriteIndex);

    // Create update operation based on whether we're adding or removing
    const updateOperation = favoriteIndex === -1
      ? { $addToSet: { favorites: productObjectId } }  // Add to favorites if not present
      : { $pull: { favorites: productObjectId } };     // Remove from favorites if present

    // Update user using findByIdAndUpdate to avoid validation issues
    const updatedUser = await User.findByIdAndUpdate(
      userObjectId,
      updateOperation,
      { 
        new: true,      // Return the updated document
        runValidators: false  // Don't run validators for this update
      }
    ).populate({
      path: 'favorites',
      select: 'name price image category code'
    });

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'Failed to update favorites'
      });
    }

    console.log('Updated favorites:', updatedUser.favorites);

    res.json({
      success: true,
      favorites: updatedUser.favorites
    });
  } catch (error) {
    console.error('Toggle favorite detailed error:', {
      error: error.message,
      stack: error.stack,
      userId: req.user?.id,
      productId: req.params.productId
    });
    res.status(500).json({
      success: false,
      message: 'Server error',
      details: error.message
    });
  }
};

// @desc    Get user's favorites
// @route   GET /api/user/favorites
// @access  Private
const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: 'favorites',
      select: 'name price image category code'
    });
    res.json({
      success: true,
      favorites: user.favorites
    });
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update cart
// @route   POST /api/user/cart
// @access  Private
const updateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    if (!productId) {
      console.error('updateCart error: Missing productId', { userId, productId, quantity });
      return res.status(400).json({ success: false, message: 'Product ID is required' });
    }

    console.log('updateCart called:', { userId, productId, quantity });

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const cartItemIndex = user.cart.findIndex(item => 
      item.product.toString() === productId
    );

    if (quantity <= 0) {
      if (cartItemIndex > -1) {
        user.cart.splice(cartItemIndex, 1);
      }
    } else if (cartItemIndex > -1) {
      user.cart[cartItemIndex].quantity = quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }

    console.log('Cart before save:', JSON.stringify(user.cart, null, 2));

    await user.save();

    // Populate product details before sending response
    const populatedUser = await User.findById(userId).populate('cart.product');
    
    console.log('Cart after save:', JSON.stringify(populatedUser.cart, null, 2));

    res.json({
      success: true,
      cart: populatedUser.cart
    });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      details: error.message
    });
  }
};

// @desc    Get user's cart
// @route   GET /api/user/cart
// @access  Private
const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('cart.product');
    res.json({
      success: true,
      cart: user.cart
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Add shipping address
// @route   POST /api/user/shipping-address
// @access  Private
const addShippingAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const newAddress = req.body;

    const user = await User.findById(userId);

    // If this is the first address or isDefault is true, set it as default
    if (user.shippingAddresses.length === 0 || newAddress.isDefault) {
      user.shippingAddresses.forEach(addr => addr.isDefault = false);
      newAddress.isDefault = true;
    }

    user.shippingAddresses.push(newAddress);
    await user.save();

    res.json({
      success: true,
      addresses: user.shippingAddresses
    });
  } catch (error) {
    console.error('Add shipping address error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get user's shipping addresses
// @route   GET /api/user/shipping-address
// @access  Private
const getShippingAddresses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({
      success: true,
      addresses: user.shippingAddresses
    });
  } catch (error) {
    console.error('Get shipping addresses error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update shipping address
// @route   PUT /api/user/shipping-address/:addressId
// @access  Private
const updateShippingAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const updatedAddress = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    const addressIndex = user.shippingAddresses.findIndex(
      addr => addr._id.toString() === addressId
    );

    if (addressIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Address not found'
      });
    }

    // Handle default address changes
    if (updatedAddress.isDefault) {
      user.shippingAddresses.forEach(addr => addr.isDefault = false);
    }

    user.shippingAddresses[addressIndex] = {
      ...user.shippingAddresses[addressIndex].toObject(),
      ...updatedAddress
    };

    await user.save();

    res.json({
      success: true,
      addresses: user.shippingAddresses
    });
  } catch (error) {
    console.error('Update shipping address error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete shipping address
// @route   DELETE /api/user/shipping-address/:addressId
// @access  Private
const deleteShippingAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const userId = req.user.id;

    const user = await User.findById(userId);
    const addressIndex = user.shippingAddresses.findIndex(
      addr => addr._id.toString() === addressId
    );

    if (addressIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Address not found'
      });
    }

    // If removing default address, set another as default if exists
    if (user.shippingAddresses[addressIndex].isDefault && 
        user.shippingAddresses.length > 1) {
      const newDefaultIndex = addressIndex === 0 ? 1 : 0;
      user.shippingAddresses[newDefaultIndex].isDefault = true;
    }

    user.shippingAddresses.splice(addressIndex, 1);
    await user.save();

    res.json({
      success: true,
      addresses: user.shippingAddresses
    });
  } catch (error) {
    console.error('Delete shipping address error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Add order to user's order history
// @route   POST /api/user/order
// @access  Private
const addOrder = async (req, res) => {
  try {
    console.log('addOrder called:', req.body, 'user:', req.user.id);
    const userId = req.user.id;
    const { orderId, products, totalAmount, shippingAddress, paymentMethod, orderStatus } = req.body;

    // Validate required fields
    if (!orderId || !Array.isArray(products) || products.length === 0 || !totalAmount) {
      return res.status(400).json({ success: false, message: 'Missing required order fields' });
    }
    for (const p of products) {
      if (!p.product || !p.quantity || !p.price) {
        return res.status(400).json({ success: false, message: 'Each product must have product, quantity, and price' });
      }
    }

    const user = await User.findById(userId);
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Convert product to ObjectId and log
    let productsWithObjectId;
    try {
      productsWithObjectId = products.map(p => ({
        product: new mongoose.Types.ObjectId(p.product),
        quantity: p.quantity,
        price: p.price
      }));
    } catch (err) {
      console.error('Error converting product to ObjectId:', err, products);
      return res.status(400).json({ success: false, message: 'Invalid product ID in products', details: err.message });
    }
    console.log('productsWithObjectId:', productsWithObjectId);

    user.orderHistory.push({
      orderId,
      products: productsWithObjectId,
      totalAmount,
      shippingAddress,
      paymentMethod,
      orderStatus: orderStatus || 'pending',
      orderDate: new Date()
    });

    await user.save();

    res.json({ success: true, orderHistory: user.orderHistory });
  } catch (error) {
    console.error('Add order error:', error);
    res.status(500).json({ success: false, message: 'Server error', details: error.message });
  }
};

// @desc    Get user's order history
// @route   GET /api/user/order-history
// @access  Private
const getOrderHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('orderHistory.products.product');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, orderHistory: user.orderHistory });
  } catch (error) {
    console.error('Get order history error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Clear user's cart
// @route   POST /api/user/cart/clear
// @access  Private
const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    user.cart = [];
    await user.save();
    res.json({ success: true, cart: user.cart });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ success: false, message: 'Server error', details: error.message });
  }
};

module.exports = {
  toggleFavorite,
  getFavorites,
  updateCart,
  getCart,
  addShippingAddress,
  getShippingAddresses,
  updateShippingAddress,
  deleteShippingAddress,
  addOrder,
  getOrderHistory,
  clearCart,
}; 