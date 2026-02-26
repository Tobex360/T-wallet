import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Card, message, Spin, Empty, Tag } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import axios from 'axios';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      navigate('/ulogin');
      return;
    }
    fetchOrders();
  }, [userId]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/orders/user/${userId}`);
      setOrders(response.data);
    } catch (error) {
      message.error('Failed to load orders');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'error';
      case 'cancelled':
        return 'default';
      default:
        return 'default';
    }
  };

  const getOrderStatusColor = (status) => {
    switch (status) {
      case 'processing':
        return 'processing';
      case 'shipped':
        return 'cyan';
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const columns = [
    {
      title: 'Order ID',
      dataIndex: '_id',
      key: '_id',
      render: (text) => text.substring(0, 8) + '...',
      width: 100,
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => new Date(text).toLocaleDateString(),
      width: 120,
    },
    {
      title: 'Items',
      dataIndex: 'items',
      key: 'items',
      render: (items) => `${items.length} item(s)`,
      width: 100,
    },
    {
      title: 'Total',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount) => `$${amount.toFixed(2)}`,
      width: 100,
    },
    {
      title: 'Payment Status',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: (status) => (
        <Tag color={getPaymentStatusColor(status)} className="capitalize">
          {status}
        </Tag>
      ),
      width: 120,
    },
    {
      title: 'Order Status',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      render: (status) => (
        <Tag color={getOrderStatusColor(status)} className="capitalize">
          {status}
        </Tag>
      ),
      width: 120,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button
          type="primary"
          size="small"
          icon={<EyeOutlined />}
          onClick={() => navigate(`/order-success/${record._id}`)}
        >
          View
        </Button>
      ),
      width: 80,
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Orders</h1>
          <p className="text-gray-600">View and track all your orders</p>
        </div>

        <Card className="shadow-lg">
          {orders.length === 0 ? (
            <Empty
              description="No orders yet"
              style={{ marginTop: 48, marginBottom: 48 }}
            >
              <Button
                type="primary"
                size="large"
                className="bg-yellow-700 hover:bg-yellow-600"
                onClick={() => navigate('/store')}
              >
                Start Shopping
              </Button>
            </Empty>
          ) : (
            <Table
              columns={columns}
              dataSource={orders}
              rowKey="_id"
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1200 }}
            />
          )}
        </Card>
      </div>
    </div>
  );
}
