// client/src/components/ProductCard.jsx

import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const isSoldOut =
    product.presentations && product.presentations[0]?.stock <= 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (
      !isSoldOut &&
      product.presentations &&
      product.presentations.length > 0
    ) {
      addToCart(product, product.presentations[0]);
    }
  };

  return (
    <Link
      to={`/product/${product._id}`}
      className={`block group ${isSoldOut ? "opacity-70" : ""}`}
    >
      <div className="relative border rounded-lg p-4 shadow-lg group-hover:shadow-xl transition-shadow h-full flex flex-col">
        {isSoldOut && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg z-10">
            <span className="text-white text-xl font-bold bg-red-600 px-4 py-2 rounded">
              AGOTADO
            </span>
          </div>
        )}
        <div className="relative">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
        </div>
        <div className="flex flex-col flex-grow mt-2">
          <h2 className="text-xl font-bold">{product.name}</h2>
          <p className="text-gray-600 mt-2 text-sm flex-grow">
            {product.description.substring(0, 80)}...
          </p>
          <div className="flex justify-between items-center mt-4">
            <span className="font-semibold text-lg">
              $
              {new Intl.NumberFormat("es-CO").format(
                product.presentations[0].price
              )}{" "}
              COP
            </span>
            {/* 3. Deshabilitamos el botón si está agotado */}
            <button
              onClick={handleAddToCart}
              className={`font-bold py-2 px-3 rounded transition-transform transform hover:scale-105 ${
                isSoldOut
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                  : "bg-teal-600 text-white hover:bg-teal-700"
              }`}
              disabled={isSoldOut} // Añade el atributo disabled
            >
              {isSoldOut ? "Agotado" : "Agregar"}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
