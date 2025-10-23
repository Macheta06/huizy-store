// client/src/pages/AdminDashboardPage.jsx
import React from "react";
import { Link } from "react-router-dom";

function AdminDashboardPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <Link
        to="/"
        className="text-teal-600 hover:text-teal-800 hover:underline mb-8 inline-block"
      >
        &larr; Volver al sitio principal
      </Link>
      <h1 className="text-3xl font-bold mb-8 text-center">
        Panel de Administración
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
        <Link
          to="/admin/productlist"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
        >
          <div className="text-4xl mb-3">🛍️</div>{" "}
          <h2 className="text-xl font-semibold text-teal-700">
            Gestionar Productos
          </h2>
          <p className="text-gray-600 mt-2">
            Crear, editar y eliminar productos de la tienda.
          </p>
        </Link>

        <Link
          to="/admin/collections"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
        >
          <div className="text-4xl mb-3">💧</div>
          <h2 className="text-xl font-semibold text-teal-700">
            Solicitudes de Recolección
          </h2>
          <p className="text-gray-600 mt-2">
            Ver las solicitudes de recolección de aceite usado.
          </p>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
