// client/src/components/HeroSlider.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

function HeroSlider() {
  return (
    <Swiper
      modules={[Autoplay, Pagination]} // Activa los módulos
      spaceBetween={0} // Sin espacio entre slides
      slidesPerView={1} // Muestra 1 slide a la vez
      pagination={{ clickable: true }} // Hace que los puntos de paginación sean clicables
      autoplay={{
        delay: 5000, // Cambia de slide cada 5 segundos
        disableOnInteraction: false,
      }}
      loop={true} // Hace que el slider sea un bucle infinito
      className="h-[500px] w-full" // Define una altura fija (ajusta 500px si lo necesitas)
    >
      <SwiperSlide className="relative bg-cover bg-center bg-[url('/images/hero-background.jpeg')]">
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center text-white p-4">
          <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
            Cuidado Natural, Conciencia Pura
          </h1>
          <p className="text-xl max-w-2xl mb-8 drop-shadow-md">
            Descubre productos de aseo y cuidado personal elaborados con saberes
            de origen.
          </p>
          <Link
            to="/shop"
            className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors"
          >
            Ir a la Tienda
          </Link>
        </div>
      </SwiperSlide>

      <SwiperSlide className="relative bg-cover bg-center bg-[url('/images/aceite-recoleccion.jpg')]">
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-4">
          <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
            ¡Tu Aceite Usado Vale Oro!
          </h1>
          <p className="text-xl max-w-2xl mb-8 drop-shadow-md">
            Transformamos el aceite de cocina usado en jabones ecológicos.
            Aprende cómo recolectarlo.
          </p>
          <Link
            to="/recoleccion"
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors"
          >
            Agendar Recolección
          </Link>
        </div>
      </SwiperSlide>

      <SwiperSlide className="relative bg-cover bg-center bg-[url('/images/emprendedoras-huizy.jpg')]">
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-center text-white p-4">
          <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
            Somos Silvy y Ana María
          </h1>
          <p className="text-xl max-w-2xl mb-8 drop-shadow-md">
            Mujeres en constante formación y construcción de alianzas.
          </p>
          <Link
            to="/conocenos"
            className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors"
          >
            Nuestra Historia
          </Link>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

export default HeroSlider;
