import React from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { DeleteOutlined, MinusOutlined, PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Divider, Empty } from 'antd';
import BackButton from '../../components/BackButton'
export default function Cart() {
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 bg-gray-50">
        <Empty
          image={<ShoppingCartOutlined style={{ fontSize: 64, color: '#ffb900' }} />}
          description={
            <span className="text-gray-500 text-lg">Your premium collection is empty.</span>
          }
        >
          <Link to="/store">
            <Button size="large" className="bg-[#ffb900] border-none font-bold text-black hover:scale-105 transition-transform">
              Explore Catalogue
            </Button>
          </Link>
        </Empty>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <BackButton />
        <h1 className="text-4xl font-black mb-10 tracking-tight flex items-center gap-3">
          <span className="text-[#ffb900]">YOUR</span> Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Side: Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.productId._id} className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-6 group transition-all hover:shadow-md">
                {/* Product Image */}
                <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                  <img 
                    src={`http://localhost:5000/${item.productId.image}`}
                    alt={item.productId.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">{item.productId.name}</h3>
                    <p className="text-yellow-700 font-black text-sm uppercase tracking-wider">
                      ${item.productId.price?.toLocaleString()}
                    </p>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-6 self-start md:self-center">
                    <div className="flex items-center bg-gray-50 rounded-full border border-gray-100 p-1">
                      <button 
                        onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full transition-colors"
                      >
                        <MinusOutlined className="text-xs" />
                      </button>
                      <span className="w-10 text-center font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full transition-colors"
                      >
                        <PlusOutlined className="text-xs" />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-gray-400 uppercase font-bold tracking-tighter">Subtotal</p>
                      <p className="font-bold text-gray-900">
                        ${(item.productId.price * item.quantity).toLocaleString()}
                      </p>
                    </div>

                    <button 
                      onClick={() => removeFromCart(item.productId._id)}
                      className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <DeleteOutlined style={{ fontSize: '18px' }} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            <button 
              onClick={clearCart}
              className="mt-4 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-red-600 transition-colors"
            >
              Discard all items
            </button>
          </div>

          {/* Right Side: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-xl font-black mb-6 uppercase tracking-tight">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">${getCartTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  <span className="text-emerald-500 font-bold uppercase text-xs">Calculated at next step</span>
                </div>
                <Divider />
                <div className="flex justify-between items-end">
                  <span className="font-bold text-lg">Total</span>
                  <div className="text-right">
                    <span className="text-2xl font-black">${getCartTotal().toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Link to="/checkout" className="w-full">
                <button className="w-full bg-[#ffb900] text-black font-black py-3 rounded-2xl hover:scale-[1.02] transition-transform shadow-lg shadow-yellow-500/20 uppercase tracking-widest">
                  Proceed to Checkout
                </button>
              </Link>
              
              <p className="mt-6 text-center text-xs text-gray-400 font-medium">
                Payments are secure and encrypted.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}