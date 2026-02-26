const express = require('express');
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  getOrder,
  updatePaymentStatus,
  cancelOrder,
} = require('../controllers/orderController');

// Create order
router.post('/create', createOrder);

// Get all user orders
router.get('/user/:userId', getUserOrders);

// Get single order
router.get('/:orderId', getOrder);

// Update payment status (after PayPal transaction)
router.put('/payment/update', updatePaymentStatus);

// Cancel order
router.delete('/cancel/:orderId', cancelOrder);

module.exports = router;
