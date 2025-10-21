// client/src/pages/ProductDetailPage.jsx

import React, { useState, useEffect } from "react"; //
import { useParams } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { BarLoader } from "react-spinners";
const API_URL = import.meta.env.VITE_API_URL || "";

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`${API_URL}/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener el producto:", error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="container mx-auto p-8">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <BarLoader color="#14b8a6" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-700 mb-6">{product.description}</p>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Ingredientes:</h3>
              <p className="text-gray-600">{product.ingredients.join(", ")}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Presentaciones:</h3>
              {product.presentations.map((p) => {
                const isPresentationSoldOut = p.stock <= 0;

                return (
                  <div
                    key={p._id || p.weight}
                    className={`flex justify-between items-center p-3 rounded-lg mb-2 ${
                      isPresentationSoldOut
                        ? "bg-gray-200 opacity-70"
                        : "bg-gray-100"
                    }`}
                  >
                    <div>
                      <span className="font-semibold">{p.weight}</span>
                      <span className="block text-gray-600">
                        ${new Intl.NumberFormat("es-CO").format(p.price)} COP
                      </span>
                    </div>
                    {/* 3. Deshabilitamos el botón condicionalmente */}
                    <button
                      onClick={() =>
                        !isPresentationSoldOut && addToCart(product, p)
                      }
                      className={`font-bold py-2 px-4 rounded transition-colors ${
                        isPresentationSoldOut
                          ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                          : "bg-teal-600 text-white hover:bg-teal-700"
                      }`}
                      disabled={isPresentationSoldOut}
                    >
                      {isPresentationSoldOut ? "Agotado" : "Agregar al Carrito"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetailPage;
