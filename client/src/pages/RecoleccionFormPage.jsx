// client/src/pages/RecoleccionFormPage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

function RecoleccionFormPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    quantity: "", // Cantidad aproximada de aceite
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar los datos (email, API, etc.)
    console.log("Datos de Agendamiento:", formData);
    setSubmitted(true); // Simulamos el éxito
  };

  // Si el formulario ya se envió
  if (submitted) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-3xl font-bold text-teal-600 mb-4">
          ¡Gracias por Agendar!
        </h1>
        <p className="text-gray-700 mb-8">
          Nos pondremos en contacto contigo pronto para coordinar la recolección
          de tu aceite.
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

  // Si no, muestra el formulario
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Agendar Recolección de Aceite Usado
      </h1>
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
          <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
            Teléfono de Contacto
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
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
            Dirección de Recolección
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
        <div className="mb-4">
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
        <div className="mb-6">
          <label
            htmlFor="quantity"
            className="block text-gray-700 font-bold mb-2"
          >
            Cantidad Aproximada (Litros)
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            placeholder="Ej: 2"
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-amber-500 text-white font-bold py-3 rounded hover:bg-amber-600 transition-colors"
        >
          Confirmar Agendamiento
        </button>
      </form>
    </div>
  );
}

export default RecoleccionFormPage;
