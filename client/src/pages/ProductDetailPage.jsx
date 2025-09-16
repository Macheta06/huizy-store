// client/src/pages/ProductDetailPage.jsx

import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function ProductDetailPage() {
  // useParams es un "hook" de React Router que nos da los parámetros de la URL (el :id)
  const { id } = useParams();
  const [product, setProduct] = useState(null); // Estado para guardar el producto único
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Pedimos los datos del producto usando el ID de la URL
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener el producto:', error);
        setLoading(false);
      });
  }, [id]); // El efecto se ejecuta cada vez que el 'id' cambie

  if (loading) {
    return <p className="text-center mt-8">Cargando producto...</p>;
  }

  if (!product) {
    return <p className="text-center mt-8">Producto no encontrado.</p>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={product.imageUrl} alt={product.name} className="w-full rounded-lg shadow-lg" />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Ingredientes:</h3>
            <p className="text-gray-600">{product.ingredients.join(', ')}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Presentaciones:</h3>
            {product.presentations.map(p => (
              <div key={p._id} className="flex justify-between items-center p-3 bg-gray-100 rounded-lg mb-2">
                <span>{p.weight}</span>
                <span className="font-bold text-lg">${new Intl.NumberFormat('es-CO').format(p.price)} COP</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;