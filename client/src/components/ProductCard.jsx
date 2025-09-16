// client/src/components/ProductCard.jsx

import React from 'react'
import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  return (
    <Link to={`/product/${product._id}`} className="block">
      <div className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow h-full">
        <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
        <h2 className="text-xl font-bold mt-2">{product.name}</h2>
        <p className="text-gray-600 mt-2 text-sm">{product.description.substring(0, 100)}...</p>
        <div className="mt-4 font-semibold text-lg">
          ${new Intl.NumberFormat('es-CO').format(product.presentations[0].price)} COP
        </div>
      </div>
    </Link>
  )
}

export default ProductCard