// client/src/pages/ProductDetailPage.jsx

import React, { useState, useEffect} from 'react'; // 
import { useParams } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
; 

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
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
  }, [id]);

  if (loading) return <p className="text-center mt-8">Cargando producto...</p>;
  if (!product) return <p className="text-center mt-8">Producto no encontrado.</p>;

  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={product.imageUrl} alt={product.name} className="w-full rounded-lg shadow-lg" />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-6">{product.description}</p>
          {/* ... (código de ingredientes) */}
          
          <div>
            <h3 className="text-xl font-semibold mb-2">Presentaciones:</h3>
            {product.presentations.map(p => (
              <div key={p._id} className="flex justify-between items-center p-3 bg-gray-100 rounded-lg mb-2">
                <div>
                  <span className="font-semibold">{p.weight}</span>
                  <span className="block text-gray-600">${new Intl.NumberFormat('es-CO').format(p.price)} COP</span>
                </div>
                <button 
                  onClick={() => addToCart(product, p)}
                  className="bg-teal-600 text-white font-bold py-2 px-4 rounded hover:bg-teal-700 transition-colors"
                >
                  Agregar al Carrito
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;