// client/src/components/Hero.jsx
import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    // --- ESTA ES LA LÍNEA CORREGIDA ---
    // La ruta ahora apunta a la imagen en tu carpeta 'public'
    <div className="relative bg-cover bg-center h-96 bg-[url('/images/hero-background.jpeg')]">
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center text-white p-4">
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
          Cuidado Natural, Conciencia Pura
        </h1>
        <p className="text-xl max-w-2xl mb-8 drop-shadow-md">
          Descubre productos de aseo y cuidado personal elaborados con saberes
          de origen y un profundo respeto por nuestros ecosistemas.
        </p>
        <Link
          to="#products-section"
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("products-section")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors"
        >
          Explorar Productos
        </Link>
      </div>
    </div>
  );
}

export default Hero;
