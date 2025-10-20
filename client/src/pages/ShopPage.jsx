// client/src/pages/ShopPage.jsx
import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { BarLoader } from "react-spinners";

const API_URL = import.meta.env.VITE_API_URL || "";

function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/api/products/`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los productos:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
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
  );
}

export default ShopPage;
