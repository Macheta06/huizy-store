// client/src/context/CartContext.jsx

import React, { useState } from 'react';
import { CartContext } from '../hooks/useCart';

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, presentation) => {
    const existingItem = cart.find(
      item => item._id === product._id && item.presentation.weight === presentation.weight
    );

    if (existingItem) {
      setCart(
        cart.map(item =>
          item._id === product._id && item.presentation.weight === presentation.weight
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, presentation, quantity: 1 }]);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};