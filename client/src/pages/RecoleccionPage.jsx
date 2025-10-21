// client/src/pages/RecoleccionPage.jsx
import React from "react";
import { Link } from "react-router-dom";

function RecoleccionPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      {/* Sección Título e Imagen */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-teal-700 mb-4">
          ¡Dale una Segunda Vida a tu Aceite de Cocina Usado!
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
          ¿Sabías que un litro de aceite de cocina usado (ACU) puede contaminar
          hasta 1,000 litros de agua? En Huizy, transformamos este residuo en
          jabones ecológicos llenos de propósito. ¡Tú puedes ser parte del
          cambio!
        </p>
        <img
          src="/images/aceite-recoleccion.jpg"
          alt="Proceso de reciclaje de aceite de cocina"
          className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
        />
      </div>

      {/* Sección Pasos para Recolectar */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Cómo Recolectar tu Aceite Correctamente
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* Paso 1 */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="text-4xl mb-3">🏺</div>
            <h3 className="font-bold text-xl mb-2">1. Enfría y Cuela</h3>
            <p className="text-gray-600">
              Deja que el aceite usado se enfríe completamente. Luego, cuélalo
              para retirar restos de comida.
            </p>
          </div>
          {/* Paso 2 */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="text-4xl mb-3">🍾</div>
            <h3 className="font-bold text-xl mb-2">2. Envásalo</h3>
            <p className="text-gray-600">
              Vierte el aceite limpio en una botella plástica con tapa (¡nunca
              vidrio!). Asegúrate de que cierre bien.
            </p>
          </div>
          {/* Paso 3 */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="text-4xl mb-3">🗓️</div>
            <h3 className="font-bold text-xl mb-2">3. Agenda la Recolección</h3>
            <p className="text-gray-600">
              Cuando tengas una cantidad considerable (mínimo 1 litro), agenda
              la recolección con nosotras.
            </p>
          </div>
        </div>
      </div>

      {/* Sección Llamada a la Acción */}
      <div className="text-center bg-teal-50 p-8 rounded-lg shadow-inner">
        <h2 className="text-3xl font-bold text-teal-800 mb-4">
          ¿Listo/a para Agendar?
        </h2>
        <p className="text-gray-700 mb-6 max-w-xl mx-auto">
          Ayúdanos a cuidar el agua y a crear productos maravillosos. Agenda la
          recolección de tu aceite usado hoy mismo.
        </p>
        <Link
          to="/agendar-recoleccion"
          className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors inline-block"
        >
          Agendar Recolección Ahora
        </Link>
      </div>
    </div>
  );
}

export default RecoleccionPage;
