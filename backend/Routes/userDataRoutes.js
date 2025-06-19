const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
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
  clearCart
} = require('../Controllers/userDataController');

// Favorites routes
router.route('/favorites').get(protect, getFavorites);
router.route('/favorites/:productId').post(protect, toggleFavorite);

// Cart routes
router.route('/cart')
  .get(protect, getCart)
  .post(protect, updateCart);
router.post('/cart/clear', protect, clearCart);

// Shipping address routes
router.route('/shipping-address')
  .get(protect, getShippingAddresses)
  .post(protect, addShippingAddress);

router.route('/shipping-address/:addressId')
  .put(protect, updateShippingAddress)
  .delete(protect, deleteShippingAddress);

// Order history route
router.post('/order', protect, addOrder);
router.get('/order-history', protect, getOrderHistory);

module.exports = router; 