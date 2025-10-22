// client/src/pages/RecoleccionFormPage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

function RecoleccionFormPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    idNumber: "", // Documento o NIT
    address: "",
    cityNeighborhood: "", // Ciudad/Barrio
    phone: "",
    locationType: "Casa-Apto", // Lugar de recolección, valor por defecto
    weekdayAvailability: [], // Disponibilidad entre semana (array)
    preferDropOff: "No", // Prefiere llevar a punto (radio button)
    comments: "", // Comentarios
  });

  // Maneja cambios en inputs de texto, email, tel, select, textarea
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "weekdayAvailability") {
      // Manejo especial para checkboxes de disponibilidad
      const currentAvailability = formData.weekdayAvailability;
      if (checked) {
        setFormData((prev) => ({
          ...prev,
          weekdayAvailability: [...currentAvailability, value],
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          weekdayAvailability: currentAvailability.filter(
            (day) => day !== value
          ),
        }));
      }
    } else if (type === "radio" && name === "preferDropOff") {
      // Manejo para radio buttons
      setFormData((prev) => ({ ...prev, preferDropOff: value }));
    } else {
      // Manejo estándar para otros inputs
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const API_URL = import.meta.env.VITE_API_URL || "";

    try {
      const response = await fetch(`${API_URL}/api/collections`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Envía los datos del formulario
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "No se pudo enviar la solicitud");
      }
      setSubmitted(true);
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      alert(`Error al enviar: ${error.message}`);
    }
  };

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

  // Formulario actualizado
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Agendar Recolección de Aceite Usado
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow"
      >
        {/* Campos actualizados */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Correo Electrónico *
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
            htmlFor="fullName"
            className="block text-gray-700 font-bold mb-2"
          >
            Nombre Completo *
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="idNumber"
            className="block text-gray-700 font-bold mb-2"
          >
            Documento de Identidad o NIT *
          </label>
          <input
            type="text"
            id="idNumber"
            name="idNumber"
            value={formData.idNumber}
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
            Dirección *
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
          <label
            htmlFor="cityNeighborhood"
            className="block text-gray-700 font-bold mb-2"
          >
            Ciudad / Barrio *
          </label>
          <input
            type="text"
            id="cityNeighborhood"
            name="cityNeighborhood"
            value={formData.cityNeighborhood}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
            Número de teléfono *
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
            htmlFor="locationType"
            className="block text-gray-700 font-bold mb-2"
          >
            Lugar de recolección *
          </label>
          <select
            id="locationType"
            name="locationType"
            value={formData.locationType}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded bg-white"
            required
          >
            <option>Casa-Apto</option>
            <option>Restaurante</option>
            <option>Empresa</option>
            <option>Otro establecimiento</option>
          </select>
        </div>

        {/* Checkboxes para disponibilidad */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Disponibilidad entre semana
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              "Lunes",
              "Martes",
              "Miércoles",
              "Jueves",
              "Viernes",
              "Sábado",
              "Domingo",
            ].map((day) => (
              <label key={day} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="weekdayAvailability"
                  value={day}
                  checked={formData.weekdayAvailability.includes(day)}
                  onChange={handleChange}
                  className="rounded"
                />
                <span>{day}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Radio buttons para punto de recolección */}
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">
            ¿Prefiere llevar el aceite a un punto de recolección?
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="preferDropOff"
                value="Si"
                checked={formData.preferDropOff === "Si"}
                onChange={handleChange}
                className="mr-2"
              />
              Sí
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="preferDropOff"
                value="No"
                checked={formData.preferDropOff === "No"}
                onChange={handleChange}
                className="mr-2"
              />
              No
            </label>
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="comments"
            className="block text-gray-700 font-bold mb-2"
          >
            Comentario (Opcional)
          </label>
          <textarea
            id="comments"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 border rounded"
          ></textarea>
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
