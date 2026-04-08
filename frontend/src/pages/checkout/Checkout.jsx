import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Input, Button, Card, message, Divider, Modal, Steps, Typography, Space, Badge } from 'antd';
import { CreditCardOutlined, HomeOutlined, ShoppingCartOutlined, CheckCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import { API_URL } from '../../config/api';

const { Title, Text } = Typography;

export default function Checkout() {
  const { cart, setCart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [orderCreated, setOrderCreated] = useState(null);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    const retryOrderState = location.state?.retryOrder;
    const retryOrderId = location.state?.retryOrderId || new URLSearchParams(location.search).get('orderId');

    const setRetryCartAndOrder = (orderData) => {
      if (!orderData || !orderData.items) return;
      const cartItems = orderData.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      }));
      setCart(cartItems);
      setOrderCreated({
        orderId: orderData._id,
        shippingAddress: orderData.shippingAddress,
      });
      form.setFieldsValue(orderData.shippingAddress);
      setIsRetrying(true);
    };

    if (!isRetrying) {
      if (retryOrderState) {
        setRetryCartAndOrder(retryOrderState);
      } else if (retryOrderId) {
        (async () => {
          try {
            const { data } = await axios.get(`${API_URL}/orders/${retryOrderId}`);
            if (data.paymentStatus === 'pending') {
              setRetryCartAndOrder(data);
            }
          } catch (error) {
            console.error('Failed to load retry order', error);
          }
        })();
      }
    }
  }, [location, isRetrying, setCart, form]);

  const userId = localStorage.getItem('userId');
  const totalAmount = getCartTotal();

  const simulateDemoPayment = async () => {
    setProcessingPayment(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await axios.put(`${API_URL}/orders/payment/update`, {
        orderId: orderCreated.orderId,
        paymentId: `demo_${Date.now()}`,
        status: 'completed',
      });

      message.success('Payment successful!');
      setPaymentModalVisible(false);
      setTimeout(() => navigate(`/order-success/${orderCreated.orderId}`), 500);
    } catch (error) {
      message.error('Payment failed. Please try again.');
    } finally {
      setProcessingPayment(false);
    }
  };

  const handleCreateOrder = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/orders/create`, {
        userId,
        shippingAddress: values,
      });
      setOrderCreated(response.data);
      message.success('Address confirmed!');
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/orders/delete/${id}`);
      setOrderCreated(null);
      message.info('Shipping details unlocked for editing');
    } catch (error) {
      message.error('Failed to reset order');
    }
  };

  const handleBackToCart = async () => {
  if (orderCreated?.orderId) {
    try {
      // Delete the pending order so it doesn't stay in the DB
      await axios.delete(`${API_URL}/orders/delete/${orderCreated.orderId}`);
    } catch (error) {
      console.error('Error clearing pending order:', error);
      // We still navigate even if delete fails, but we log the error
    }
  }
  navigate('/cart');
};

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
        <ShoppingCartOutlined className="text-6-xl text-gray-200 mb-4" style={{ fontSize: '64px' }} />
        <Title level={2}>Your cart is empty</Title>
        <Text type="secondary" className="mb-6">Add items to your cart before checking out.</Text>
        <Button type="primary" size="large" onClick={() => navigate('/store')}>
          Back to Store
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header & Steps */}
        <div className="mb-12 text-center">
          <Title level={1}>Checkout</Title>
          <div className="max-w-xl mx-auto mt-8">
            <Steps
              current={orderCreated ? 1 : 0}
              items={[
                { title: 'Shipping', icon: <HomeOutlined /> },
                { title: 'Payment', icon: <CreditCardOutlined /> },
                { title: 'Success', icon: <CheckCircleOutlined /> },
              ]}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Shipping Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-sm border-0 rounded-xl">
              <div className="flex justify-between items-center mb-6">
                <Title level={4} className="m-0">Shipping Information</Title>
                {orderCreated && (
                  <Button 
                    type="link" 
                    danger 
                    icon={<DeleteOutlined />} 
                    onClick={() => handleDelete(orderCreated.orderId)}
                  >
                    Edit Address
                  </Button>
                )}
              </div>

              {!orderCreated ? (
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleCreateOrder}
                  requiredMark="optional"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                    <Form.Item label="Full Name" name="fullName" className="md:col-span-2" rules={[{ required: true }]}>
                      <Input placeholder="John Doe" size="large" />
                    </Form.Item>
                    <Form.Item label="Email Address" name="email" rules={[{ required: true, type: 'email' }]}>
                      <Input placeholder="john@example.com" size="large" />
                    </Form.Item>
                    <Form.Item label="Phone Number" name="phone" rules={[{ required: true }]}>
                      <Input placeholder="+1 (555) 000-0000" size="large" />
                    </Form.Item>
                    <Form.Item label="Address" name="address" className="md:col-span-2" rules={[{ required: true }]}>
                      <Input placeholder="123 Main Street" size="large" />
                    </Form.Item>
                    <Form.Item label="City" name="city" rules={[{ required: true }]}>
                      <Input placeholder="New York" size="large" />
                    </Form.Item>
                    <Form.Item label="State/Province" name="state" rules={[{ required: true }]}>
                      <Input placeholder="NY" size="large" />
                    </Form.Item>
                    <Form.Item label="Zip Code" name="zipCode" rules={[{ required: true }]}>
                      <Input placeholder="10001" size="large" />
                    </Form.Item>
                    <Form.Item label="Country" name="country" rules={[{ required: true }]}>
                      <Input placeholder="United States" size="large" />
                    </Form.Item>
                  </div>
                  <Button
                    type="primary"
                    size="large"
                    block
                    className="mt-4 h-12 bg-indigo-600 hover:bg-indigo-700"
                    htmlType="submit"
                    loading={loading}
                  >
                    Confirm Shipping Details
                  </Button>
                </Form>
              ) : (
                <div className="py-8 text-center bg-green-50 rounded-xl border border-dashed border-green-200">
                  <CheckCircleOutlined className="text-4xl text-green-500 mb-2" />
                  <p className="text-green-800 font-medium">Shipping address confirmed!</p>
                  <Button 
                    type="primary" 
                    icon={<CreditCardOutlined />} 
                    size="large" 
                    className="mt-4 bg-green-600 border-0"
                    onClick={() => setPaymentModalVisible(true)}
                  >
                    Proceed to Payment
                  </Button>
                </div>
              )}
            </Card>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <Card className="shadow-md border-0 rounded-xl sticky top-8">
              <Title level={4} className="mb-6">Order Summary</Title>
              
              <div className="max-h-60 overflow-y-auto pr-2 mb-4 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.productId._id} className="flex justify-between items-start mb-4">
                    <Space orientation="vertical" size={0}>
                      <Text strong className="block">{item.productId.name}</Text>
                      <Text type="secondary" size="small">Qty: {item.quantity}</Text>
                    </Space>
                    <Text strong>${(item.productId.price * item.quantity).toFixed(2)}</Text>
                  </div>
                ))}
              </div>

              <Divider />

              <div className="space-y-3">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-lg font-bold mt-4 pt-4 border-t">
                  <span>Total</span>
                  <span className="text-indigo-600 text-2xl">${totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                {!orderCreated && (
                  <Button 
                    type="primary" 
                    block 
                    size="large" 
                    onClick={() => form.submit()} 
                    loading={loading}
                    className="h-12 bg-indigo-600"
                  >
                    Review & Pay
                  </Button>
                )}
                <Button block size="large" variant="text" onClick={handleBackToCart}>
                  Edit Cart
                </Button>
              </div>
              
              <Text type="secondary" className="text-[10px] text-center block mt-6">
                🔒 Secure SSL Encryption
              </Text>
            </Card>
          </div>
        </div>
      </div>

      {/* Payment Modal Refined */}
      <Modal
        title={null}
        open={paymentModalVisible}
        onCancel={() => setPaymentModalVisible(false)}
        footer={null}
        centered
        width={400}
      >
        <div className="text-center p-4">
          <CreditCardOutlined className="text-4xl text-indigo-600 mb-4" />
          <Title level={3}>Demo Payment</Title>
          <Text type="secondary">This is a sandbox simulation. No actual funds will be moved.</Text>
          
          <div className="bg-gray-50 rounded-lg p-4 my-6 flex justify-between">
            <Text>Amount to Pay:</Text>
            <Text strong className="text-lg">${totalAmount.toFixed(2)}</Text>
          </div>

          <Button
            type="primary"
            size="large"
            block
            loading={processingPayment}
            onClick={simulateDemoPayment}
            className="h-12 bg-green-600 hover:bg-green-700 border-0 mb-3"
          >
            Complete Purchase
          </Button>
          <Button block type="text" onClick={() => setPaymentModalVisible(false)}>
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
}