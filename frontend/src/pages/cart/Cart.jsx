import React from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/store" className="text-yellow-700 hover:underline">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        {cart.map(item => (
          <div key={item.productId._id} className="flex items-center justify-between border-b py-4">
            <div className="flex items-center gap-4">
              <img 
                src={`http://localhost:5000/${item.productId.image}`}
                alt={item.productId.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold">{item.productId.name}</h3>
                <p className="text-gray-600">${item.productId.price}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <span className="px-4">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>

              <div className="font-bold w-24 text-right">
                ${(item.productId.price * item.quantity).toFixed(2)}
              </div>

              <button 
                onClick={() => removeFromCart(item.productId._id)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        <div className="mt-6 flex justify-between items-center">
          <button 
            onClick={clearCart}
            className="text-red-600 hover:text-red-800"
          >
            Clear Cart
          </button>
          
          <div className="text-right">
            <p className="text-xl font-bold">Total: ${getCartTotal().toFixed(2)}</p>
            <button className="mt-4 bg-yellow-700 text-white px-8 py-3 rounded-lg hover:bg-yellow-600">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}