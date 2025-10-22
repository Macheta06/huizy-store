// client/src/context/CartContext.jsx

import React, { useState } from "react";
import { CartContext } from "../hooks/useCart";
import toast from "react-hot-toast";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, presentation, quantityToAdd = 1) => {
    // Añade quantityToAdd
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
            ? { ...item, quantity: item.quantity + quantityToAdd } // Usa quantityToAdd
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, presentation, quantity: quantityToAdd }]); // Usa quantityToAdd
    }
    toast.success(
      `${product.name} (${presentation.weight}) x ${quantityToAdd} añadido al carrito!`
    );
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

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
