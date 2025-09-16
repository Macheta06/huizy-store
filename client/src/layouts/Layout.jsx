// client/src/layouts/Layout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* El Outlet renderizará el componente de la ruta hija (HomePage, etc.) */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Un pie de página simple */}
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>&copy; {new Date().getFullYear()} Huizy. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default Layout;