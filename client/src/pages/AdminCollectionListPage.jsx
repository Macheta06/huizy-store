// client/src/pages/AdminCollectionListPage.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import toast from "react-hot-toast"; // Importa toast para feedback

function AdminCollectionListPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL || ""; // Asegúrate de tener esto

  const fetchRequests = async () => {
    setLoading(true); // Ponemos loading en true al empezar a cargar
    try {
      const response = await fetch(`${API_URL}/api/collections`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error("No se pudieron obtener las solicitudes");
      }
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar las solicitudes."); // Notificación de error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchRequests();
    }
  }, [token]);

  const handleStatusChange = async (requestId, currentStatus) => {
    const newStatus =
      currentStatus === "Pendiente" ? "Completada" : "Pendiente";

    // Pregunta confirmación (opcional pero útil)
    if (!window.confirm(`¿Marcar esta solicitud como ${newStatus}?`)) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/collections/${requestId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("No se pudo actualizar el estado");
      }

      toast.success(`Estado actualizado a ${newStatus}`);
      // Vuelve a cargar la lista para reflejar el cambio
      fetchRequests();
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar el estado.");
    }
  };

  if (loading && requests.length === 0) {
    // Muestra loading solo si no hay datos previos
    return <p className="text-center mt-8">Cargando solicitudes...</p>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      {/* ... (Link de volver y título) ... */}

      {requests.length === 0 && !loading ? ( // Muestra mensaje solo si la carga terminó y no hay datos
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
                <th className="py-3 px-6 text-center">Acción</th>{" "}
                {/* Columna para el botón */}
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
                      className={`py-1 px-3 rounded-full text-xs font-semibold ${
                        req.status === "Pendiente"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-green-200 text-green-800"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>

                  {/* Celda del botón (ya la tenías) */}
                  <td className="py-3 px-6 text-center">
                    <button
                      onClick={() => handleStatusChange(req._id, req.status)}
                      className={`py-1 px-3 rounded text-xs font-bold transition-colors ${
                        req.status === "Pendiente"
                          ? "bg-green-500 hover:bg-green-600 text-white"
                          : "bg-yellow-500 hover:bg-yellow-600 text-white"
                      }`}
                    >
                      {req.status === "Pendiente"
                        ? "Marcar Completada"
                        : "Marcar Pendiente"}
                    </button>
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
