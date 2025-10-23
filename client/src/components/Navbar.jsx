// client/src/components/Navbar.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";

function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Función para alternar el menú
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-teal-700 text-white shadow-md">
      <div className="container mx-auto px-4 md:px-8 py-3 flex justify-between items-center">
        <Link to="/">
          <img
            src="/images/LogoCircular.png"
            alt="Logo de Huizy"
            className="h-10 md:h-14 w-auto"
          />
        </Link>

        {/* Botón Hamburguesa (solo visible en móvil) */}
        <div className="md:hidden">
          {" "}
          {/* Oculto en pantallas medianas y superiores */}
          <button onClick={toggleMobileMenu} aria-label="Abrir menú">
            {/* Icono Hamburguesa (tres líneas) */}
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Enlaces de Navegación (visible en desktop, oculto en móvil por defecto) */}
        <div className="hidden md:flex items-center space-x-4">
          {" "}
          {/* Oculto por defecto, visible en 'md' y superior */}
          {/* --- Copia aquí EXACTAMENTE los mismos enlaces que pondrás en el menú móvil --- */}
          <Link to="/" className="hover:text-teal-200">
            Inicio
          </Link>
          <Link to="/shop" className="hover:text-teal-200">
            Tienda
          </Link>
          <Link to="/conocenos" className="hover:text-teal-200">
            Conócenos
          </Link>
          {user ? (
            <>
              {user.isAdmin && (
                <Link
                  to="/admin/dashboard"
                  className="font-bold bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500"
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
              <Link to="/login" className="hover:text-teal-200">
                Login
              </Link>
              <Link to="/register" className="hover:text-teal-200">
                Registro
              </Link>
            </>
          )}
          {/* Icono del Carrito (siempre visible en desktop) */}
          <Link to="/cart" className="relative hover:text-teal-200">
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

      {/* --- MENÚ DESPLEGABLE MÓVIL --- */}
      {/* Se muestra solo si isMobileMenuOpen es true. 'md:hidden' asegura que desaparezca en desktop */}
      <div
        className={`md:hidden ${
          isMobileMenuOpen ? "block" : "hidden"
        } mt-4 space-y-2`}
      >
        {/* --- Copia aquí EXACTAMENTE los mismos enlaces que pusiste arriba para desktop --- */}
        {/* La diferencia es que ahora son verticales y ocupan todo el ancho */}
        <Link
          to="/"
          className="block px-3 py-2 rounded hover:bg-teal-600"
          onClick={toggleMobileMenu}
        >
          Inicio
        </Link>
        <Link
          to="/shop"
          className="block px-3 py-2 rounded hover:bg-teal-600"
          onClick={toggleMobileMenu}
        >
          Tienda
        </Link>
        <Link
          to="/conocenos"
          className="block px-3 py-2 rounded hover:bg-teal-600"
          onClick={toggleMobileMenu}
        >
          Conócenos
        </Link>

        {user ? (
          <>
            {user.isAdmin && (
              <Link
                to="/admin/dashboard"
                className="block px-3 py-2 rounded font-bold bg-yellow-400 text-black hover:bg-yellow-500"
                onClick={toggleMobileMenu}
              >
                Panel de Admin
              </Link>
            )}
            <Link
              to="/my-orders"
              className="block px-3 py-2 rounded hover:bg-teal-600"
              onClick={toggleMobileMenu}
            >
              Mis Pedidos
            </Link>
            {/* No mostramos "Hola, Nombre" aquí, es redundante */}
            <button
              onClick={() => {
                logout();
                toggleMobileMenu();
              }}
              className="w-full text-left bg-red-500 hover:bg-red-600 px-3 py-2 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="block px-3 py-2 rounded hover:bg-teal-600"
              onClick={toggleMobileMenu}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="block px-3 py-2 rounded hover:bg-teal-600"
              onClick={toggleMobileMenu}
            >
              Registro
            </Link>
          </>
        )}
        {/* El carrito también en móvil */}
        <Link
          to="/cart"
          className="relative block px-3 py-2 rounded hover:bg-teal-600"
          onClick={toggleMobileMenu}
        >
          Carrito
          {totalItems > 0 && (
            <span className="ml-2 inline-block bg-red-500 text-white text-xs rounded-full h-5 w-5 leading-5 text-center">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
