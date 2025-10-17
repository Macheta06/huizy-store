// client/src/pages/HomePage.jsx

import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { BarLoader } from "react-spinners";
import Hero from "../components/Hero";
const API_URL = import.meta.env.VITE_API_URL || "";

function HomePage() {
  // Estado para guardar la lista de productos
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // useEffect para ejecutar la petición a la API cuando el componente se monta
  useEffect(() => {
    setLoading(true);
    // Usamos fetch para pedir los datos a nuestro backend
    fetch(`${API_URL}/api/products/`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false); // Ponemos en false cuando los datos llegan
      }) // Guardamos los datos en el estado
      .catch((error) => {
        console.error("Error al obtener los productos:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Hero />
      <div id="products-section" className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center my-8">
          Nuestros Productos
        </h1>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <BarLoader color="#14b8a6" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
