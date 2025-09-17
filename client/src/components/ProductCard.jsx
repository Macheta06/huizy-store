// client/src/components/ProductCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart'; 

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (product.presentations && product.presentations.length > 0) {
      addToCart(product, product.presentations[0]);
    }
  };

  return (
    <Link to={`/product/${product._id}`} className="block group">
      <div className="border rounded-lg p-4 shadow-lg group-hover:shadow-xl transition-shadow h-full flex flex-col">
        <div className="relative">
          <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
        </div>
        <div className="flex flex-col flex-grow mt-2">
          <h2 className="text-xl font-bold">{product.name}</h2>
          <p className="text-gray-600 mt-2 text-sm flex-grow">{product.description.substring(0, 80)}...</p>
          <div className="flex justify-between items-center mt-4">
            <span className="font-semibold text-lg">
              ${new Intl.NumberFormat('es-CO').format(product.presentations[0].price)} COP
            </span>
            <button
              onClick={handleAddToCart}
              className="bg-teal-600 text-white font-bold py-2 px-3 rounded hover:bg-teal-700 transition-transform transform hover:scale-105"
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;