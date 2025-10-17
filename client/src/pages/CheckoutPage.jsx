// client/src/pages/CheckoutPage.jsx

import React, { useState } from "react";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { formatWhatsAppMessage } from "../utils/formatMessage";
const API_URL = import.meta.env.VITE_API_URL || "";

function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { token } = useAuth();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const total = cart.reduce(
      (sum, item) => sum + item.presentation.price * item.quantity,
      0
    );

    const orderData = {
      orderItems: cart.map((item) => ({
        _id: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.presentation.price,
        weight: item.presentation.weight,
        imageUrl: item.imageUrl,
      })),
      shippingInfo: formData,
      totalPrice: total,
    };

    try {
      // --- PASO A (Híbrido): Guardamos la orden en la BD para el historial del cliente ---
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("No se pudo guardar la orden");
      }

      // --- PASO B (Nuevo): Generamos y enviamos el mensaje de WhatsApp ---

      const phone = import.meta.env.VITE_WHATSAPP_NUMBER;
      const message = formatWhatsAppMessage(formData, cart, total);
      const encodedMessage = encodeURIComponent(message);
      const whatsappURL = `https://wa.me/${phone}?text=${encodedMessage}`;
      window.open(whatsappURL, "_blank");
      setOrderPlaced(true);
      clearCart();
    } catch (error) {
      console.error("Error al finalizar la compra:", error);
    }
  };

  if (orderPlaced) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-3xl font-bold text-teal-600 mb-4">
          ¡Gracias por tu compra!
        </h1>
        <p className="text-gray-700 mb-8">
          Tu pedido ha sido recibido y será procesado pronto.
        </p>
        <Link
          to="/"
          className="bg-teal-600 text-white font-bold py-2 px-6 rounded hover:bg-teal-700 transition-colors"
        >
          Volver al Inicio
        </Link>
      </div>
    );
  }

  // Si no, muestra el formulario de checkout
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Finalizar Compra</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow"
      >
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Nombre Completo
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-gray-700 font-bold mb-2"
          >
            Dirección de Envío
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="city" className="block text-gray-700 font-bold mb-2">
            Ciudad
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-teal-600 text-white font-bold py-3 rounded hover:bg-teal-700 transition-colors"
        >
          Realizar Pedido
        </button>
      </form>
    </div>
  );
}

export default CheckoutPage;
