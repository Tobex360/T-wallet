import React, { useState, useEffect } from 'react';
import hero from '../../assets/frame 21.jpg';
import { Card, Button, message, Badge, Typography, Divider, Spin } from 'antd';
import { ShoppingCartOutlined, FireOutlined } from '@ant-design/icons';
import axios from 'axios';
import "../../App.css";

const { Meta } = Card;
const { Title, Text } = Typography;

function Store() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/products/getproducts');
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
      message.error("Could not load products");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (product) => {
    const user = localStorage.getItem('user');
    if (!user) {
      message.warning('Please login to add items to cart');
      return;
    }
    message.success(`${product.name} added to cart!`);
  };

  return (
    <div className='bg-gray-50 min-h-screen'>
      {/* --- HERO SECTION --- */}
      <div className='relative flex items-center overflow-hidden h-125 md:h-'>
        <div 
          className='absolute inset-0 z-0'
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.2)), url(${hero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        <div className='relative z-10 px-8 md:px-20 max-w-4xl'>
          <Badge count={<FireOutlined style={{ color: '#ffb900' }} />} offset={[10, 0]}>
            <Text className='text-[#ffb900] font-bold tracking-[0.2em] uppercase'>New Arrivals 2026</Text>
          </Badge>
          <h1 className='text-white text-5xl md:text-7xl font-black mb-6 leading-tight uppercase italic'>
            Discover <br /><span className='text-[#ffb900]'>What's New</span>
          </h1>
          <p className='text-gray-300 text-lg md:text-xl max-w-xl mb-8 leading-relaxed'>
            Fresh styles, timeless quality. Explore our latest wallet collection designed for modern elegance and smart features.
          </p>
          <Button 
            size="large" 
            className='bg-[#ffb900] border-none text-black font-bold h-14 px-10 rounded-none hover:scale-105 transition-transform'
          >
            SHOP COLLECTION
          </Button>
        </div>
      </div>

      {/* --- SECTION DIVIDER --- */}
      <div className='py-12 px-8'>
        <Divider orientation="left">
          <Title level={2} className='m-0 uppercase tracking-widest'>Our Catalogue</Title>
        </Divider>
      </div>

      {/* --- PRODUCT GRID --- */}
      <div className='px-8 pb-20'>
        {loading ? (
          <div className='flex justify-center items-center h-40'><Spin size="large" /></div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
            {products.filter(product => product.status === 'active').length > 0 ? (
              products.filter(product => product.status === 'active').map((product) => (
                <Card
                  key={product._id}
                  hoverable
                  className='border-none shadow-sm overflow-hidden group'
                  cover={
                    <div className='overflow-hidden h-72 relative'>
                      <img
                        alt={product.name}
                        src={`http://localhost:5000/${product.image}`}
                        className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                      />
                      {product.stock < 5 && (
                        <div className='absolute top-2 right-2 bg-red-600 text-white px-3 py-1 text-xs font-bold uppercase'>
                          Low Stock
                        </div>
                      )}
                    </div>
                  }
                  actions={[
                    <Button 
                      type="text" 
                      icon={<ShoppingCartOutlined />} 
                      onClick={() => handleAddToCart(product)}
                      className='hover:text-[#ffb900] font-bold'
                    >
                      ADD TO CART
                    </Button>
                  ]}
                >
                  <div className='flex justify-between items-start mb-2'>
                    <Title level={4} className='m-0 truncate' style={{ fontSize: '1.1rem' }}>
                      {product.name}
                    </Title>
                    <Text className='font-black text-[#ffb900] text-lg'>
                      ₦{product.price?.toLocaleString()}
                    </Text>
                  </div>
                  <Text type="secondary" className='block h-12 overflow-hidden italic mb-2'>
                    {product.description}
                  </Text>
                  <Text className='text-[10px] uppercase tracking-widest text-gray-400'>
                    Available: {product.stock} units
                  </Text>
                </Card>
              ))
            ) : (
              <div className='col-span-full text-center py-20 bg-white rounded-xl border-dashed border-2 border-gray-200'>
                <Text type="secondary" className='text-xl'>Our vault is currently empty. Check back soon!</Text>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Store;