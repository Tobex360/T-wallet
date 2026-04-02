import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Card, message, Spin, Empty, Tag, Space, Typography, Popconfirm, Tooltip } from 'antd';
import { EyeOutlined, DeleteOutlined, ShoppingOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title, Text } = Typography;

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
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`http://localhost:5000/orders/delete/${orderId}`);
      message.success('Order removed from history');
      fetchOrders();
    } catch (error) {
      message.error('Failed to delete order');
    }
  };

  const getStatusTag = (status, type) => {
    const config = {
      payment: {
        completed: { color: 'success', label: 'Paid' },
        pending: { color: 'warning', label: 'Pending' },
        failed: { color: 'error', label: 'Failed' },
      },
      order: {
        processing: { color: 'blue', label: 'Processing' },
        shipped: { color: 'cyan', label: 'Shipped' },
        delivered: { color: 'green', label: 'Delivered' },
        cancelled: { color: 'red', label: 'Cancelled' },
      }
    };

    const item = config[type][status] || { color: 'default', label: status };
    return (
      <Tag color={item.color} style={{ borderRadius: '4px', textTransform: 'uppercase', fontWeight: 600 }}>
        {item.label}
      </Tag>
    );
  };

  const columns = [
    {
      title: 'Order Details',
      key: 'orderInfo',
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <Text strong>#{record._id.substring(record._id.length - 8)}</Text>
          <Text type="secondary" size="small">{new Date(record.createdAt).toLocaleDateString()}</Text>
        </Space>
      ),
    },
    {
      title: 'Items',
      dataIndex: 'items',
      key: 'items',
      render: (items) => <Text>{items.length} {items.length === 1 ? 'item' : 'items'}</Text>,
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount) => <Text strong className="text-lg">${amount.toFixed(2)}</Text>,
    },
    {
      title: 'Payment',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: (status) => getStatusTag(status, 'payment'),
    },
    {
      title: 'Order Status',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      render: (status) => getStatusTag(status, 'order'),
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      width: 120,
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="View Details">
            <Button
              type="primary"
              shape="circle"
              icon={<EyeOutlined />}
              onClick={() => navigate(`/order-success/${record._id}`)}
            />
          </Tooltip>
          
          <Popconfirm
            title="Delete this order history?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <Tooltip title="Delete">
              <Button
                danger
                type="text"
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-white">
        <Spin size="large" />
        <Text className="mt-4" type="secondary">Loading your orders...</Text>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <Title level={2} style={{ margin: 0 }}>My Purchase History</Title>
            <Text type="secondary">Track, manage, and view details of your previous orders.</Text>
          </div>
          {orders.length > 0 && (
            <Button 
              icon={<ShoppingOutlined />} 
              onClick={() => navigate('/store')}
            >
              Continue Shopping
            </Button>
          )}
        </div>

        <Card 
          bordered={false} 
          className="shadow-sm overflow-hidden" 
          bodyStyle={{ padding: 0 }}
        >
          {orders.length === 0 ? (
            <div className="py-20">
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  <span className="text-gray-500 text-lg">
                    You haven't placed any orders yet.
                  </span>
                }
              >
                <Button
                  type="primary"
                  size="large"
                  icon={<ShoppingOutlined />}
                  className="mt-4 h-12 px-8 rounded-full bg-blue-600"
                  onClick={() => navigate('/store')}
                >
                  Explore Store
                </Button>
              </Empty>
            </div>
          ) : (
            <Table
              columns={columns}
              dataSource={orders}
              rowKey="_id"
              pagination={{ 
                pageSize: 8, 
                position: ['bottomCenter'],
                showTotal: (total) => `Total ${total} orders` 
              }}
              scroll={{ x: 800 }}
              className="ant-table-striped"
            />
          )}
        </Card>
      </div>
    </div>
  );
}