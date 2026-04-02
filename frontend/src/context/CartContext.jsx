import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { message } from 'antd';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  // --- Fetch cart by userId ---
  const fetchCart = async (id) => {
    if (!id) return;
    try {
      const response = await axios.get(`http://localhost:5000/cart/get/${id}`);
      setCart(response.data.items || []);
    } catch (error) {
      console.error('Failed to fetch cart', error);
    }
  };

  // --- Initialize userId and cart ---
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      const id = userData.userid || userData.userId;
      if (id) {
        setUserId(id);
        fetchCart(id);
      }
    }

    // Listen for login/logout events
    const handleAuthChange = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        const id = userData.userid || userData.userId;
        setUserId(id);
        fetchCart(id);
      } else {
        setUserId(null);
        setCart([]);
      }
    };

    window.addEventListener('authChange', handleAuthChange);
    return () => window.removeEventListener('authChange', handleAuthChange);
  }, []);

  // --- Add item to cart ---
  const addToCart = async (productId, quantity = 1) => {
    if (!userId) {
      message.error('Please log in to add items to your cart');
      return { success: false, error: 'No userId found' };
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/cart/add', {
        userId,
        productId,
        quantity,
      });
      setCart(response.data.items || []);
      return { success: true };
    } catch (error) {
      console.error('Failed to add to cart', error);
      message.error('Failed to add item to cart');
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  // --- Update quantity ---
  const updateQuantity = async (productId, quantity) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.warn('Cannot update quantity: user is not logged in');
      return;
    }
    try {
      const response = await axios.put('http://localhost:5000/cart/update', {
        userId,
        productId,
        quantity,
      });
      setCart(response.data.items || []);
    } catch (error) {
      console.error('Failed to update cart', error);
    }
  };

  // --- Remove from cart ---
  const removeFromCart = async (productId) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.warn('Cannot remove from cart: user is not logged in');
      return;
    }
    try {
      const response = await axios.delete('http://localhost:5000/cart/remove', {
        data: { userId, productId },
      });
      setCart(response.data.items || []);
    } catch (error) {
      console.error('Failed to remove from cart', error);
    }
  };

  // --- Clear cart ---
  const clearCart = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.warn('Cannot clear cart: user is not logged in');
      return;
    }
    try {
      await axios.delete(`http://localhost:5000/cart/clear/${userId}`);
      setCart([]);
    } catch (error) {
      console.error('Failed to clear cart', error);
    }
  };

  // --- Helpers ---
  const getCartTotal = () =>
    cart.reduce((total, item) => total + (item.productId?.price || 0) * item.quantity, 0);

  const getCartCount = () =>
    cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        setCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};