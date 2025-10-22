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
  const [quantities, setQuantities] = useState({});

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

  const handleQuantityChange = (presentationId, value) => {
    const quantity = parseInt(value, 10);
    // Asegura que la cantidad sea al menos 1
    if (quantity >= 1) {
      setQuantities((prev) => ({
        ...prev,
        [presentationId]: quantity,
      }));
    }
  };

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
              <h3 className="text-xl font-semibold mb-4">Presentaciones:</h3>{" "}
              {product.presentations.map((p) => {
                const isPresentationSoldOut = p.stock <= 0;
                const presentationId = `${product._id}-${p.weight}`;
                const selectedQuantity = quantities[presentationId] || 1;

                return (
                  <div
                    key={presentationId}
                    className={`flex flex-wrap justify-between items-center p-3 rounded-lg mb-4 ${
                      isPresentationSoldOut
                        ? "bg-gray-200 opacity-70"
                        : "bg-gray-100"
                    }`}
                  >
                    <div className="mb-2 sm:mb-0">
                      <span className="font-semibold block sm:inline mr-2">
                        {p.weight}
                      </span>
                      <span className="block sm:inline text-gray-600">
                        ${new Intl.NumberFormat("es-CO").format(p.price)} COP
                      </span>
                      {!isPresentationSoldOut && (
                        <span className="text-xs text-gray-500 block sm:inline sm:ml-2">
                          ({p.stock} disponibles)
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-3">
                      <input
                        type="number"
                        min="1"
                        max={p.stock}
                        value={selectedQuantity}
                        onChange={(e) =>
                          handleQuantityChange(presentationId, e.target.value)
                        }
                        className={`w-16 px-2 py-1 border rounded ${
                          isPresentationSoldOut
                            ? "bg-gray-300 cursor-not-allowed"
                            : ""
                        }`}
                        disabled={isPresentationSoldOut}
                      />
                      <button
                        onClick={() =>
                          !isPresentationSoldOut &&
                          addToCart(product, p, selectedQuantity)
                        }
                        className={`font-bold py-2 px-4 rounded transition-colors ${
                          isPresentationSoldOut
                            ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                            : "bg-teal-600 text-white hover:bg-teal-700"
                        }`}
                        disabled={isPresentationSoldOut}
                      >
                        {isPresentationSoldOut ? "Agotado" : "Agregar"}
                      </button>
                    </div>
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
