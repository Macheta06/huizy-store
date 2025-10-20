// client/src/layouts/Layout.jsx

import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import FloatingWhatsApp from "../components/FloatingWhatsapp";
import { Link } from "react-router-dom";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Toaster position="top-center" />
      <Navbar />

      {/* El Outlet renderizará el componente de la ruta hija (HomePage, etc.) */}
      <main className="flex-grow">
        <Outlet />
      </main>

      <FloatingWhatsApp />

      <footer className="bg-gray-800 text-white pt-12 pb-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between text-left mb-8">
            {/* Columna 1: Navegación */}
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h5 className="font-bold mb-2 uppercase">Navegación</h5>
              <ul>
                <li>
                  <Link to="/" className="hover:underline">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link to="/shop" className="hover:underline">
                    Tienda
                  </Link>
                </li>
                <li>
                  <Link to="/conocenos" className="hover:underline">
                    Conócenos
                  </Link>
                </li>
                <li>
                  <Link to="/recoleccion" className="hover:underline">
                    Recolecta Aceite
                  </Link>
                </li>
              </ul>
            </div>

            {/* Columna 2: Redes Sociales */}
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h5 className="font-bold mb-2 uppercase">Síguenos</h5>
              <div className="flex space-x-4">
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/somoshuizy?locale=es_LA"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <svg
                    className="h-6 w-6 fill-current hover:text-teal-400"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/somoshuizy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <svg
                    className="h-6 w-6 fill-current hover:text-teal-400"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.441 1.441 1.441 1.441-.645 1.441-1.441c0-.795-.645-1.44-1.441-1.44z" />
                  </svg>
                </a>
                {/* TikTok */}
                <a
                  href="https://www.tiktok.com/@somoshuizy"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                >
                  <svg
                    className="h-6 w-6 fill-current hover:text-teal-400"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.55 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.05-4.84-.6-6.6-2.31-1.76-1.71-2.59-4.2-2.31-6.6.27-2.39 1.52-4.64 3.23-6.32.8-2.03 3.16-3.17 5.3-3.21.02-.01.01-.01.01-.01z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p>
              &copy; {new Date().getFullYear()} Huizy. Todos los derechos
              reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
