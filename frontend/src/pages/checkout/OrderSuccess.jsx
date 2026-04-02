import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Divider, Spin, message } from 'antd';
import { CheckCircleOutlined, CheckOutlined, ClockCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

export default function OrderSuccess() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/orders/${orderId}`);
      setOrder(response.data);
    } catch (error) {
      message.error('Failed to load order details');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Order not found</h2>
        <Button onClick={() => navigate('/store')}>Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Success Message */}
        <div className="text-center mb-8">
          {order.paymentStatus=='completed'? <CheckCircleOutlined className="text-6xl text-green-500 mb-4" />:<ClockCircleOutlined className="text-6xl text-yellow-700 mb-4" /> }
          <h1 className="text-4xl font-bold text-green-600 mb-2">
            {order.paymentStatus=='completed' ? 'Payment Successful!':'Payment Pending!'}
          </h1>
          <p className="text-gray-600 text-lg">
            {/* Thank you for your purchase. Your order has been confirmed. */}
            {order.paymentStatus=='completed'?'Thank you for your purchase. Your order has been confirmed.':'You are yet to complete your payment'}
          </p>
        </div>

        {/* Order Details Card */}
        <Card className="shadow-lg mb-6">
          <h2 className="text-2xl font-bold mb-6">Order Details</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-gray-600 text-sm mb-1">Order ID</p>
              <p className="text-lg font-bold text-gray-900 break-all">{order._id}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-1">Payment Status</p>
              <p className="text-lg font-bold">
                {/* <span className="text-green-600">✓ {order.paymentStatus.toUpperCase()}</span> */}
                <span className={order.paymentStatus=='completed' ? "text-green-600":"text-yellow-700"}>{order.paymentStatus=='completed'? <CheckOutlined />:<ClockCircleOutlined />} {order.paymentStatus.toUpperCase()}</span>
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-1">Order Status</p>
              <p className="text-lg font-bold capitalize">{order.orderStatus}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-1">Order Date</p>
              <p className="text-lg font-bold">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <Divider />

          {/* Shipping Address */}
          <h3 className="text-xl font-bold mb-4">Shipping Address</h3>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="font-semibold">{order.shippingAddress.fullName}</p>
            <p>{order.shippingAddress.address}</p>
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
              {order.shippingAddress.zipCode}
            </p>
            <p>{order.shippingAddress.country}</p>
            <p className="text-gray-600 mt-2">
              Email: {order.shippingAddress.email}
            </p>
            <p className="text-gray-600">Phone: {order.shippingAddress.phone}</p>
          </div>

          <Divider />

          {/* Order Items */}
          <h3 className="text-xl font-bold mb-4">Order Items</h3>
          <div className="space-y-4 mb-6">
            {order.items.map((item) => (
              <div
                key={item.productId._id}
                className="flex justify-between items-center border-b pb-4"
              >
                <div className="flex-1">
                  <p className="font-semibold">{item.productId.name}</p>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity} × ${item.price.toFixed(2)}
                  </p>
                </div>
                <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <Divider />

          {/* Total */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-xl font-bold">Total Amount:</span>
            <span className="text-3xl font-black text-yellow-700">
              ${order.totalAmount.toFixed(2)}
            </span>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            size="large"
            className="flex-1 bg-yellow-700 text-black font-bold hover:bg-yellow-600"
            onClick={() => navigate('/store')}
          >
            Retry Payment
          </Button>

          <Button
            size="large"
            className="flex-1"
            onClick={() => navigate('/orders')}
          >
            View My Orders
          </Button>
        </div>

        {/* Information */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <h3 className="font-bold text-blue-900 mb-2">What happens next?</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>✓ A confirmation email has been sent to {order.shippingAddress.email}</li>
            <li>✓ Your order will be processed and shipped within 2-3 business days</li>
            <li>✓ You will receive a tracking number via email once shipped</li>
            <li>✓ Track your order status anytime in "My Orders"</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
