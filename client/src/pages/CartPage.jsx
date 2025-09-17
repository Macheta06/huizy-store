// client/src/pages/CartPage.jsx

import React from "react";
import { useCart } from "../hooks/useCart";
import { Link } from "react-router-dom";

function CartPage() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();
  const subtotal = cart.reduce(
    (sum, item) => sum + item.presentation.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Tu Carrito de Compras</h1>
        <p className="text-gray-600 mb-8">
          Aún no has agregado productos a tu carrito.
        </p>
        <Link
          to="/"
          className="bg-teal-600 text-white font-bold py-2 px-6 rounded hover:bg-teal-700 transition-colors"
        >
          Ver Productos
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Tu Carrito de Compras
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Columna de Items */}
        <div className="md:col-span-2">
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={`${item._id}-${item.presentation.weight}`}
                className="flex items-center bg-white p-4 rounded-lg shadow"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded mr-4"
                />
                <div className="flex-grow">
                  <h2 className="font-bold text-lg">{item.name}</h2>
                  <p className="text-sm text-gray-600">
                    {item.presentation.weight}
                  </p>
                  <p className="font-semibold">
                    $
                    {new Intl.NumberFormat("es-CO").format(
                      item.presentation.price
                    )}{" "}
                    COP
                  </p>
                </div>
                <div className="flex items-center gap-3 mx-4">
                  <button
                    onClick={() =>
                      decreaseQuantity(item._id, item.presentation.weight)
                    }
                    className="bg-gray-200 rounded-full w-6 h-6 font-bold flex items-center justify-center"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      increaseQuantity(item._id, item.presentation.weight)
                    }
                    className="bg-gray-200 rounded-full w-6 h-6 font-bold flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() =>
                    removeFromCart(item._id, item.presentation.weight)
                  }
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Columna del Resumen de Compra */}
        <div className="md:col-span-1">
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Resumen</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span className="font-semibold">
                ${new Intl.NumberFormat("es-CO").format(subtotal)} COP
              </span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Envío:</span>
              <span>A calcular</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between font-bold text-xl">
              <span>Total:</span>
              <span>
                ${new Intl.NumberFormat("es-CO").format(subtotal)} COP
              </span>
            </div>
            <button className="w-full bg-teal-600 text-white font-bold py-3 mt-6 rounded hover:bg-teal-700 transition-colors">
              Proceder al Pago
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
