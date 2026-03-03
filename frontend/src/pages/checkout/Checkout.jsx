import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, message, Divider, Spin, Modal } from 'antd';
import { CreditCardOutlined } from '@ant-design/icons';
import axios from 'axios';

export default function Checkout() {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [orderCreated, setOrderCreated] = useState(null);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);

  const userId = localStorage.getItem('userId');

  const simulateDemoPayment = async () => {
    setProcessingPayment(true);
    try {
      // Simulate payment processing delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Update order with payment details
      const response = await axios.put('http://localhost:5000/orders/payment/update', {
        orderId: orderCreated.orderId,
        paymentId: `demo_${Date.now()}`,
        status: 'completed',
      });

      message.success('Demo payment successful!');
      setPaymentModalVisible(false);
      setTimeout(() => {
        navigate(`/order-success/${orderCreated.orderId}`);
      }, 1000);
    } catch (error) {
      message.error('Payment failed. Please try again.');
      console.error('Error:', error);
    } finally {
      setProcessingPayment(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-4">Add items to your cart before checkout</p>
        <a href="/store" className="text-yellow-700 hover:underline font-bold">
          Continue Shopping
        </a>
      </div>
    );
  }

  const handleCreateOrder = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/orders/create', {
        userId,
        shippingAddress: values,
      });

      setOrderCreated(response.data);
      message.success('Order created successfully!');
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to create order');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async(id) =>{
    try{
      await axios.delete(`http://localhost:5000/orders/delete/${id}`);
      setOrderCreated(null);
      message.success('you can now edit your shipping details');
    } catch (error){
      message.error('failed to delete order');
      console.error('Error:', error);
    }
  }

  const totalAmount = getCartTotal();

  return (
    <>
      {/* Demo Payment Modal */}
      <Modal
        title="Demo Payment Simulation"
        open={paymentModalVisible}
        onCancel={() => setPaymentModalVisible(false)}
        footer={null}
        centered
      >
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-700 font-semibold mb-2">Demo Mode</p>
            <p className="text-xs text-blue-600">
              This is a test payment. No real charges will be made. Click "Complete Payment" to simulate a successful transaction.
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-semibold">Order Summary</p>
            <div className="flex justify-between text-sm border-b pb-2">
              <span>Subtotal:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <Button
            size="large"
            className="w-full bg-green-600 text-black hover:bg-green-700 font-bold"
            loading={processingPayment}
            onClick={simulateDemoPayment}
          >
            {processingPayment ? 'Processing Payment...' : 'Complete Payment'}
          </Button>
          
          <Button
            size="large"
            className="w-full"
            onClick={() => setPaymentModalVisible(false)}
            disabled={processingPayment}
          >
            Cancel
          </Button>
        </div>
      </Modal>

      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-12 text-center">Checkout</h1>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Shipping & Form */}
            <div>
              <Card className="shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>

                {!orderCreated ? (
                  <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleCreateOrder}
                    autoComplete="off"
                  >
                    <Form.Item
                      label="Full Name"
                      name="fullName"
                      rules={[{ required: true, message: 'Please enter your full name' }]}
                    >
                      <Input placeholder="John Doe" size="large" />
                    </Form.Item>

                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        { required: true, message: 'Please enter your email' },
                        { type: 'email', message: 'Invalid email format' },
                      ]}
                    >
                      <Input placeholder="john@example.com" size="large" />
                    </Form.Item>

                    <Form.Item
                      label="Phone Number"
                      name="phone"
                      rules={[{ required: true, message: 'Please enter your phone number' }]}
                    >
                      <Input placeholder="+1 (555) 000-0000" size="large" />
                    </Form.Item>

                    <Form.Item
                      label="Address"
                      name="address"
                      rules={[{ required: true, message: 'Please enter your address' }]}
                    >
                      <Input placeholder="123 Main Street" size="large" />
                    </Form.Item>

                    <div className="grid grid-cols-2 gap-4">
                      <Form.Item
                        label="City"
                        name="city"
                        rules={[{ required: true, message: 'Please enter your city' }]}
                      >
                        <Input placeholder="New York" size="large" />
                      </Form.Item>

                      <Form.Item
                        label="State/Province"
                        name="state"
                        rules={[{ required: true, message: 'Please enter your state' }]}
                      >
                        <Input placeholder="NY" size="large" />
                      </Form.Item>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Form.Item
                        label="Zip Code"
                        name="zipCode"
                        rules={[{ required: true, message: 'Please enter your zip code' }]}
                      >
                        <Input placeholder="10001" size="large" />
                      </Form.Item>

                      <Form.Item
                        label="Country"
                        name="country"
                        rules={[{ required: true, message: 'Please enter your country' }]}
                      >
                        <Input placeholder="United States" size="large" />
                      </Form.Item>
                    </div>

                    <Button
                      type="primary"
                      size="large"
                      className="w-full bg-yellow-700 hover:bg-yellow-600"
                      htmlType="submit"
                      loading={loading}
                    >
                      Continue to Payment
                    </Button>
                  </Form>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-sm text-green-700">
                        ✓ Order created. Ready for payment.
                      </p>
                    </div>
                    <Button
                      size="large"
                      className="w-full bg-blue-600 text-black hover:bg-blue-700 font-bold"
                      htmlType='button'
                      icon={<CreditCardOutlined />}
                      onClick={() => setPaymentModalVisible(true)}
                    >
                      Pay with Demo Payment
                    </Button>
                    <Button
                      danger
                      size="large"
                      className="w-full"
                      htmlType='button'
                      onClick={()=>handleDelete(orderCreated.orderId)}
                    >
                      Cancel & Edit Shipping
                    </Button>
                  </div>
                )}
              </Card>
            </div>

            {/* Right Column - Order Summary */}
            <div>
              <Card className="shadow-lg sticky top-4">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.productId._id} className="flex justify-between items-center border-b pb-4">
                      <div className="flex-1">
                        <p className="font-semibold">{item.productId.name}</p>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity} × ${item.productId.price}
                        </p>
                      </div>
                      <p className="font-bold">
                        ${(item.productId.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <Divider />

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-semibold">${totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping:</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax:</span>
                    <span>Calculated at next step</span>
                  </div>
                </div>

                <Divider />

                <div className="flex justify-between items-center mb-8">
                  <span className="text-xl font-bold">Total:</span>
                  <span className="text-3xl font-black text-yellow-700">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>

                {!orderCreated && (
                  <Button
                    type="primary"
                    size="large"
                    className="w-full bg-yellow-700 hover:bg-yellow-600"
                    onClick={() => form.submit()}
                    loading={loading}
                  >
                    Complete Order & Pay
                  </Button>
                )}

                <Button
                  size="large"
                  className="w-full mt-3"
                  onClick={() => navigate('/cart')}
                >
                  Back to Cart
                </Button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Payments are secure and encrypted.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}