const express = require('express');
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  getOrder,
  updatePaymentStatus,
  cancelOrder,
  deleteOrder,
} = require('../controllers/orderController');

// Create order
router.post('/create', createOrder);

// Update payment status
router.put('/payment/update', updatePaymentStatus);

// Cancel order
router.delete('/cancel/:orderId', cancelOrder);

// Delete order
router.delete('/delete/:id', deleteOrder);

// Get all user orders
router.get('/user/:userId', getUserOrders);

// ALWAYS KEEP DYNAMIC PARAM ROUTES LAST
router.get('/:orderId', getOrder);


module.exports = router;
