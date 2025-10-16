// client/src/pages/AdminProductListPage.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function AdminProductListPage() {
  const [products, setProducts] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/`);
    const data = await res.json();
    setProducts(data);
  };

  const deleteHandler = async (id) => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar este producto?")
    ) {
      try {
        await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Producto eliminado exitosamente");
        fetchProducts(); // Vuelve a cargar la lista de productos
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
        toast.error("No se pudo eliminar el producto.");
      }
    }
  };

  return (
    <div className="container mx-auto p-8">
      <Link
        to="/"
        className="text-teal-600 hover:text-teal-800 hover:underline mb-4 inline-block"
      >
        &larr; Volver al sitio principal
      </Link>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestionar Productos</h1>
        <Link
          to="/admin/product/new"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear Producto
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Nombre</th>
              <th className="py-3 px-6 text-center">Precio</th>
              <th className="py-3 px-6 text-center">Categoría</th>
              <th className="py-3 px-6 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {products.map((product) => (
              <tr
                key={product._id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {product._id}
                </td>
                <td className="py-3 px-6 text-left">{product.name}</td>
                <td className="py-3 px-6 text-center">
                  $
                  {new Intl.NumberFormat("es-CO").format(
                    product.presentations[0].price
                  )}
                </td>
                <td className="py-3 px-6 text-center">{product.category}</td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <Link
                      to={`/admin/product/${product._id}/edit`}
                      className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center mr-2"
                    >
                      ✏️
                    </Link>
                    <button
                      onClick={() => deleteHandler(product._id)}
                      className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default AdminProductListPage;
