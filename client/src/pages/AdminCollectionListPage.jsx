// client/src/pages/AdminCollectionListPage.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

function AdminCollectionListPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchRequests = async () => {
      const API_URL = import.meta.env.VITE_API_URL || "";
      try {
        const response = await fetch(`${API_URL}/api/collections`, {
          headers: {
            Authorization: `Bearer ${token}`, // Necesario para la ruta protegida
          },
        });
        if (!response.ok) {
          throw new Error("No se pudieron obtener las solicitudes");
        }
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchRequests();
    }
  }, [token]);

  if (loading) {
    return <p className="text-center mt-8">Cargando solicitudes...</p>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Link
        to="/"
        className="text-teal-600 hover:text-teal-800 hover:underline mb-4 inline-block"
      >
        &larr; Volver al sitio principal
      </Link>
      <h1 className="text-3xl font-bold mb-8 text-center">
        Solicitudes de Recolección de Aceite
      </h1>

      {requests.length === 0 ? (
        <p className="text-center text-gray-600">
          No hay solicitudes pendientes.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <tr>
                <th className="py-3 px-6 text-left">Fecha</th>
                <th className="py-3 px-6 text-left">Nombre</th>
                <th className="py-3 px-6 text-left">Teléfono</th>
                <th className="py-3 px-6 text-left">Dirección</th>
                <th className="py-3 px-6 text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {requests.map((req) => (
                <tr
                  key={req._id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {new Date(req.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6 text-left">{req.fullName}</td>
                  <td className="py-3 px-6 text-left">{req.phone}</td>
                  <td className="py-3 px-6 text-left">
                    {req.address}, {req.cityNeighborhood}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <span
                      className={`py-1 px-3 rounded-full text-xs ${
                        req.status === "Pendiente"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-green-200 text-green-800"
                      }`}
                    >
                      {req.status}
                    </span>
                    {/* Aquí podríamos añadir un botón para cambiar el estado */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminCollectionListPage;
