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
  deleteShippingAddress
} = require('../controllers/userDataController');

// Favorites routes
router.route('/favorites').get(protect, getFavorites);
router.route('/favorites/:productId').post(protect, toggleFavorite);

// Cart routes
router.route('/cart')
  .get(protect, getCart)
  .post(protect, updateCart);

// Shipping address routes
router.route('/shipping-address')
  .get(protect, getShippingAddresses)
  .post(protect, addShippingAddress);

router.route('/shipping-address/:addressId')
  .put(protect, updateShippingAddress)
  .delete(protect, deleteShippingAddress);

module.exports = router; 