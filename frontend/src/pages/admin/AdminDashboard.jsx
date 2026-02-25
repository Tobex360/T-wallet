import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Button, Modal, Form, Input, InputNumber, Select, Tag, Space, Upload, message, Dropdown} from 'antd';
import axios from 'axios';
import { PlusOutlined, DashboardOutlined, ShoppingOutlined, UserOutlined, UploadOutlined,ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;
const { TextArea } = Input;

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('products');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form] = Form.useForm(); // Antd Form Instance
  const [uploadedFile, setUploadedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const navigate = useNavigate()



  const [products, setProducts] = useState([]);

  useEffect(() => {
  fetchProducts();
  }, []);

  useEffect(()=>{
    const admin = localStorage.getItem('admin');

    if (admin){
      const adminData = JSON.parse(admin);

      setUsername(adminData.username || 'Username')
      setFirstname(adminData.firstname || 'Firstname')
      setLastname(adminData.lastname || 'Lastname')
    }

  }, []);

  const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:5000/products/getproducts');
    setProducts(response.data);
  } catch (error) {
    console.error('Failed to fetch products', error);
  }
};

  // --- Handlers ---
  
  const showModal = (product = null) => {
    setEditingProduct(product);
    if (product) {
      form.setFieldsValue(product); // Pre-fill form for editing
    } else {
      form.resetFields(); // Clear form for new product
    }
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setUploadedFile(null);
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      if (editingProduct) {
        // Edit functionality - call backend API
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('description', values.description);
        formData.append('price', values.price);
        formData.append('stock', values.stock);
        formData.append('status', values.status);
        
        if (uploadedFile) {
          formData.append('image', uploadedFile);
        }

        const response = await axios.put(`http://localhost:5000/products/update/${editingProduct._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setProducts(prev => prev.map(p => 
          p._id === editingProduct._id ? response.data : p
        ));
        message.success('Product updated successfully');
      } else {
        // Create new product - call backend API
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('description', values.description);
        formData.append('price', values.price);
        formData.append('stock', values.stock);
        formData.append('status', values.status);
        
        if (uploadedFile) {
          formData.append('image', uploadedFile);
        }

        const response = await axios.post('http://localhost:5000/products/create', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setProducts(prev => [...prev, response.data]);
        message.success('Product added successfully');
      }
      setIsModalOpen(false);
      form.resetFields();
      setUploadedFile(null);
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to save product');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (info) => {
    setUploadedFile(info.file);
  };

  const handleDelete = (id) => {
    confirm({
      title: 'Are you sure you want to delete this product?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'No',
      async onOk() {
        try {
          await axios.delete(`http://localhost:5000/products/delete/${id}`);
          setProducts(prev => prev.filter(p => p._id !== id));
          message.success('Product deleted successfully');
        } catch (error) {
          message.error(error.response?.data?.message || 'Failed to delete product');
          console.error('Error:', error);
        }
      },
    });
  };
  const handleLogout = ()=>{
    localStorage.removeItem('admin');

    window.dispatchEvent(new Event('authChange'));
    setUsername('');
    navigate('/');
  };

  const items=[
    {
      label: (
        <span onClick={handleLogout}>
          Logout
        </span>
      ),
      key: '0',
    },
  ];

  // --- Table Columns Definition ---
  const columns = [
  {
    title: 'Image',
    dataIndex: 'image',
    key: 'image',
    render: (image) => (
      <div style={{ width: '60px', height: '60px', overflow: 'hidden', borderRadius: '4px' }}>
        {image ? (
          <img 
            src={`http://localhost:5000/${image}`}  // Add the backend URL prefix
            alt="product" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/60?text=No+Image';
            }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc' }}>
            No Image
          </div>
        )}
      </div>
    ),
  },
    {
      title: 'Product',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: 600 }}>{text}</div>
          <div style={{ fontSize: '12px', color: '#8c8c8c' }}>{record.description}</div>
        </div>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'default'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => showModal(record)}>Edit</Button>
          <Button type="link" danger onClick={() => handleDelete(record._id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-yellow-800 text-white flex flex-col fixed h-full">
        <div className="p-6">
          <h1 className="text-xl font-bold mb-8">Admin page</h1>
          <nav className="flex flex-col gap-2">
            <Button 
              type={activeTab === 'dashboard' ? 'primary' : 'text'} 
              block icon={<DashboardOutlined />}
              className={`text-left h-10 ${activeTab === 'dashboard' ? 'bg-yellow-600' : 'text-white'}`}
              onClick={() => setActiveTab('dashboard')}
            > Dashboard </Button>
            <Button 
              type={activeTab === 'products' ? 'primary' : 'text'} 
              block icon={<ShoppingOutlined />}
              className={`text-left h-10 ${activeTab === 'products' ? 'bg-yellow-600' : 'text-white'}`}
              onClick={() => setActiveTab('products')}
            > Products </Button>
            <Button 
              type={activeTab === 'users' ? 'primary' : 'text'} 
              block icon={<UserOutlined />}
              className={`text-left h-10 ${activeTab === 'users' ? 'bg-yellow-600' : 'text-white'}`}
              onClick={() => setActiveTab('users')}
            > Users </Button>
            <Dropdown menu={{ items }} trigger={['click']}>
              <div className='hover:cursor-pointer' onClick={(e) => e.preventDefault()}>
                <Space>
                  <UserOutlined />
                  {username}
                </Space>
              </div>
            </Dropdown>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-8">
        <h6>Welcome {firstname} {lastname}</h6>
        <header className="bg-white p-6 rounded-lg shadow-sm mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold capitalize">{activeTab}</h2>
          {activeTab === 'products' && (
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              size="large"
              className="bg-yellow-700 hover:bg-yellow-600"
              onClick={() => showModal()}
            >
              Add Product
            </Button>
          )}
        </header>

        {activeTab === 'products' && (
          <Table 
            columns={columns} 
            dataSource={products} 
            rowKey="_id" 
            className="bg-white rounded-lg shadow-sm"
          />
        )}

        {/* Simplified sections for brevity */}
        {activeTab !== 'products' && (
          <div className="bg-white p-20 rounded-lg text-center text-gray-400">
            {activeTab} content coming soon...
          </div>
        )}
      </div>

      {/* Ant Design Modal + Form */}
      <Modal
        title={editingProduct ? "Edit Product" : "Add New Product"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null} // We use the form buttons instead
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ status: 'active' }}
        >
          <Form.Item
            name="name"
            label="Product Name"
            rules={[{ required: true, message: 'Please enter product name' }]}
          >
            <Input placeholder="e.g. Leather Wallet" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <TextArea rows={3} />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="price"
              label="Price ($)"
              rules={[{ required: true }]}
            >
              <InputNumber className="w-full" min={0} step={0.01} />
            </Form.Item>

            <Form.Item
              name="stock"
              label="Stock Quantity"
              rules={[{ required: true }]}
            >
              <InputNumber className="w-full" min={0} />
            </Form.Item>
          </div>

          <Form.Item name="status" label="Status">
            <Select>
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="inactive">Inactive</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Product Image">
            <Upload 
              listType="picture" 
              maxCount={1} 
              beforeUpload={() => false}
              onChange={handleFileUpload}
            >
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          </Form.Item>

          <Form.Item className="mb-0 text-right">
            <Space>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button type="primary" htmlType="submit" className="bg-yellow-700" loading={loading}>
                {editingProduct ? 'Update Product' : 'Add Product'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}