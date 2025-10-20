// client/src/components/Navbar.jsx

import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";

function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-teal-700 text-white shadow-md">
      <div className="container mx-auto px-4 md:px-8 py-3 flex justify-between items-center">
        <Link to="/">
          <img
            src="/images/LogoPNG.png"
            alt="Logo de Huizy"
            className="h-10 md:h-14 w-auto"
          />
        </Link>

        {/* Enlaces de Navegación */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="hover:text-teal-200">
            Inicio
          </Link>
          <Link to="/shop" className="hover:text-teal-200">
            Tienda
          </Link>{" "}
          <Link to="/conocenos" className="hover:text-teal-200">
            Conócenos
          </Link>{" "}
          {user ? (
            <>
              {/* Comprueba si el usuario existe Y si es admin */}
              {user.isAdmin && (
                <Link
                  to="/admin/productlist"
                  className="font-bold bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500 transition-colors"
                >
                  Panel de Admin
                </Link>
              )}

              <Link to="/my-orders" className="hover:text-teal-200">
                Mis Pedidos
              </Link>
              <span className="font-semibold">Hola, {user.name}</span>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* El usuario no está logueado */}
              <Link to="/login" className="hover:text-teal-200">
                Login
              </Link>
              <Link to="/register" className="hover:text-teal-200">
                Registro
              </Link>
            </>
          )}
          {/* Icono del Carrito (siempre visible) */}
          <Link to="/cart" className="relative hover:text-teal-200">
            {/* ... tu SVG del carrito ... */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
