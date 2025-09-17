// client/src/pages/CheckoutPage.jsx

import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { Link } from 'react-router-dom';

function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log("--- NUEVO PEDIDO ---");
    console.log("Datos del Cliente:", formData);
    console.log("Productos en el Carrito:", cart);
    
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-3xl font-bold text-teal-600 mb-4">¡Gracias por tu compra!</h1>
        <p className="text-gray-700 mb-8">Tu pedido ha sido recibido y será procesado pronto.</p>
        <Link to="/" className="bg-teal-600 text-white font-bold py-2 px-6 rounded hover:bg-teal-700 transition-colors">
          Volver al Inicio
        </Link>
      </div>
    );
  }

  // Si no, muestra el formulario de checkout
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Finalizar Compra</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Nombre Completo</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Correo Electrónico</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 font-bold mb-2">Dirección de Envío</label>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
        </div>
        <div className="mb-6">
          <label htmlFor="city" className="block text-gray-700 font-bold mb-2">Ciudad</label>
          <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
        </div>
        <button type="submit" className="w-full bg-teal-600 text-white font-bold py-3 rounded hover:bg-teal-700 transition-colors">
          Realizar Pedido
        </button>
      </form>
    </div>
  );
}

export default CheckoutPage;