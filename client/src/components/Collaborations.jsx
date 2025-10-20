// client/src/components/Collaborations.jsx
import React from "react";

function Collaborations() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          Nuestras Alianzas
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-12">
          {/* Reemplaza 'src' con la ruta a los logos en 'public/images/' */}
          <img
            src="/images/logo-alianza-1.png"
            alt="Logo Alianza 1"
            className="h-16"
          />
          <img
            src="/images/logo-alianza-2.png"
            alt="Logo Alianza 2"
            className="h-20"
          />
          <img
            src="/images/logo-alianza-3.png"
            alt="Logo Alianza 3"
            className="h-16"
          />
        </div>
      </div>
    </div>
  );
}
export default Collaborations;
