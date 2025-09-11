// client/src/components/ProductCard.jsx

import React from 'react'

// Recibirá un 'product' con toda su información como prop
function ProductCard({ product }) {
  return (
    <div className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow">
      <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
      <h2 className="text-xl font-bold mt-2">{product.name}</h2>
      <p className="text-gray-600 mt-2">{product.description.substring(0, 100)}...</p>
      <div className="mt-4 font-semibold text-lg">
        ${new Intl.NumberFormat('es-CO').format(product.presentations[0].price)} COP
      </div>
    </div>
  )
}

export default ProductCard