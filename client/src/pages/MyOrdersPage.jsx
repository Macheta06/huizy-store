// client/src/pages/MyOrdersPage.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { BarLoader } from "react-spinners";
const API_URL = import.meta.env.VITE_API_URL || "";

function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_URL}/api/orders/myorders`, {
          headers: {
            // Enviamos el token para la autorización
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("No se pudieron obtener los pedidos");
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchOrders();
    }
  }, [token]);

  if (loading) {
    return <p className="text-center mt-8">Cargando tus pedidos...</p>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Mis Pedidos</h1>
      {orders.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Aún no has realizado ningún pedido.
          </p>
          <Link to="/" className="text-teal-600 font-bold hover:underline">
            Explorar productos
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="font-bold">
                    Pedido #{order._id.substring(0, 8)}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Fecha: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">
                    Total: $
                    {new Intl.NumberFormat("es-CO").format(order.totalPrice)}{" "}
                    COP
                  </p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Productos:</h3>
                {order.orderItems.map((item) => (
                  <div
                    key={item.product}
                    className="flex items-center text-sm mb-2"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-10 h-10 object-cover rounded mr-3"
                    />
                    <span>
                      {item.name} ({item.weight}) x {item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrdersPage;
