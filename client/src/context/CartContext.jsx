// client/src/context/CartContext.jsx

import React, { useState } from "react";
import { CartContext } from "../hooks/useCart";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, presentation) => {
    const existingItem = cart.find(
      (item) =>
        item._id === product._id &&
        item.presentation.weight === presentation.weight
    );

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item._id === product._id &&
          item.presentation.weight === presentation.weight
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, presentation, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId, presentationWeight) => {
    setCart(
      cart.filter(
        (item) =>
          !(
            item._id === productId &&
            item.presentation.weight === presentationWeight
          )
      )
    );
  };

  // Función para incrementar la cantidad
  const increaseQuantity = (productId, presentationWeight) => {
    setCart(
      cart.map((item) =>
        item._id === productId &&
        item.presentation.weight === presentationWeight
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Función para decrementar la cantidad
  const decreaseQuantity = (productId, presentationWeight) => {
    setCart(
      cart
        .map((item) =>
          item._id === productId &&
          item.presentation.weight === presentationWeight
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
