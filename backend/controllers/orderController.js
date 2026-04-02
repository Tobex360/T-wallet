const Order = require("../models/order");
const Cart = require("../models/cart");
const Product = require("../models/products");
const mongoose = require("mongoose");

// Create order from cart
async function createOrder(req, res) {
  try {
    const { userId, shippingAddress } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID required" });
    }

    // Get cart items
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Create order items with current prices
    const orderItems = await Promise.all(
      cart.items.map(async (item) => {
        const product = await Product.findById(item.productId._id);
        return {
          productId: item.productId._id,
          quantity: item.quantity,
          price: product.price,
        };
      })
    );

    // Calculate total
    const totalAmount = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Create order
    const order = new Order({
      userId,
      items: orderItems,
      totalAmount,
      shippingAddress,
      paymentStatus: "pending",
      orderStatus: "pending",
    });

    await order.save();
    res.status(201).json({ orderId: order._id, totalAmount: order.totalAmount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get user orders
async function getUserOrders(req, res) {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId })
      .populate("items.productId")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get single order
async function getOrder(req, res) {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId).populate("items.productId");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Update payment status
async function updatePaymentStatus(req, res) {
  try {
    const { orderId, paymentId, status } = req.body;

    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        paymentStatus: status,
        paymentId,
        orderStatus: status === "completed" ? "processing" : "pending",
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Clear cart if payment successful
    if (status === "completed") {
      await Cart.findOneAndUpdate({ userId: order.userId }, { items: [] });
    }

    res.json({ message: "Payment status updated", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Cancel order
async function cancelOrder(req, res) {
  try {
    const { orderId } = req.params;

    const order = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus: "cancelled", paymentStatus: "cancelled" },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order cancelled", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteOrder(req,res) {
  try{
    const { id } =req.params;
    const deletedOrder = await Order.findByIdAndDelete(id);

    if(!deletedOrder){
      return res.status(404).json({message: ' Order not found' });
    }
    res.json({ message: 'Order deleted successfully', order: deletedOrder });
  }catch(error){
    res.status(500).json({ message: error.message });
  }
  
}
module.exports = {
  createOrder,
  getUserOrders,
  getOrder,
  updatePaymentStatus,
  cancelOrder,
  deleteOrder,
};
