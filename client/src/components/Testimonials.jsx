// client/src/components/Testimonials.jsx
import React from "react";

function Testimonials() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          Lo que dicen de nosotras
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Testimonio 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-gray-600 italic mb-4">
              "¡Los jabones son increíbles! Dejaron mi piel súper suave y el
              champú sólido es lo mejor que he probado."
            </p>
            <p className="font-bold text-teal-700">- Laura G.</p>
          </div>
          {/* Testimonio 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-gray-600 italic mb-4">
              "Saber que ayudo al planeta reciclando mi aceite y además obtengo
              productos de calidad, no tiene precio."
            </p>
            <p className="font-bold text-teal-700">- Carlos M.</p>
          </div>
          {/* Testimonio 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-gray-600 italic mb-4">
              "Excelente atención y compromiso. Se nota el amor que le ponen a
              cada producto."
            </p>
            <p className="font-bold text-teal-700">- Sofia R.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Testimonials;
