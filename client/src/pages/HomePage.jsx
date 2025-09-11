// client/src/pages/HomePage.jsx

import React, { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard';

function HomePage() {
  // Estado para guardar la lista de productos
  const [products, setProducts] = useState([]);

  // useEffect para ejecutar la petición a la API cuando el componente se monta
  useEffect(() => {
    // Usamos fetch para pedir los datos a nuestro backend
    // Gracias al proxy, solo necesitamos usar '/api/products'
    fetch('/api/products')
      .then(response => response.json())
      .then(data => setProducts(data)) // Guardamos los datos en el estado
      .catch(error => console.error('Error al obtener los productos:', error));
  }, []); // El array vacío asegura que esto solo se ejecute una vez

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-8">Nuestros Productos</h1>

      {/* Renderizamos la lista de productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.length === 0 ? (
          <p>Cargando productos...</p>
        ) : (
          // Mapeamos el array de productos y creamos un ProductCard por cada uno
          products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  )
}

export default HomePage