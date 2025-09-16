// client/src/components/Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-teal-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo o Nombre de la Marca */}
        <Link to="/" className="text-2xl font-bold hover:text-teal-200 transition-colors">
          HUIZY
        </Link>

        {/* Enlaces de Navegación (podemos agregar más después) */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="hover:text-teal-200 transition-colors">Inicio</Link>
          {/* Más enlaces como "Tienda", "Nosotros", etc. irían aquí */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;