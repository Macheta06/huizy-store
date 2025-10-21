// client/src/pages/AboutUsPage.jsx
import React from "react";

function AboutUsPage() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 md:px-8">
        {/* Sección Principal: Quiénes Somos */}
        <div className="flex flex-col md:flex-row items-center bg-white p-8 rounded-lg shadow-lg mb-12">
          <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-teal-700 mb-4">
              Somos Silvy y Ana María
            </h1>
            <p className="text-lg text-gray-700 mb-4">
              Nos unimos con el objetivo de brindar alternativas de aseo y
              cuidado personal desde los{" "}
              <strong className="font-semibold">saberes de origen</strong>.
            </p>
            <p className="text-gray-600 mb-6">
              Somos mujeres en constante formación y construcción de alianzas
              que proyectan nuestro quehacer hacia la recuperación de prácticas
              tradicionales. Buscamos mitigar los impactos negativos de nuestro
              consumo como humanidad.
            </p>
          </div>
          <div className="md:w-1/2">
            {/* Asegúrate de tener esta imagen en public/images/ */}
            <img
              src="/images/emprendedoras-huizy.jpg"
              alt="Silvy y Ana María de Huizy"
              className="rounded-lg shadow-md w-full"
            />
          </div>
        </div>

        {/* Sección: Qué Hacemos */}
        <div className="bg-teal-50 p-8 rounded-lg shadow-inner mb-12">
          <h2 className="text-3xl font-bold text-center text-teal-800 mb-8">
            Nuestra Labor con Propósito
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded shadow">
              <h3 className="font-bold text-xl mb-3 text-amber-600">
                Transformamos el ACU
              </h3>
              <p className="text-gray-600">
                Gestionamos y transformamos el Aceite de Cocina Usado (ACU) en{" "}
                <strong className="font-semibold">jabones multiusos</strong>{" "}
                mediante procesos de saponificación en frío. ¡Un litro de ACU
                contamina 1,000 litros de agua!
              </p>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <h3 className="font-bold text-xl mb-3 text-lime-600">
                Ingredientes Naturales
              </h3>
              <p className="text-gray-600">
                Utilizamos{" "}
                <strong className="font-semibold">
                  ingredientes naturales y la herbolaria
                </strong>{" "}
                (uso ancestral y medicinal de las plantas) para dar propiedades
                diversas a nuestros productos, evitando agentes tóxicos para tu
                salud y los ecosistemas.
              </p>
            </div>
          </div>
        </div>

        {/* Sección: Alianzas */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-center mb-10">
            Construyendo Comunidad: Nuestras Alianzas
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Creemos en el poder de tejer redes. Colaboramos con organizaciones
            que comparten nuestra visión de soberanía local, agroecología y
            economía circular.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {/* Reemplaza 'src' con la ruta a los logos en 'public/images/' */}
            <img
              src="/images/logo-alianza-1.png"
              alt="Logo Alianza 1"
              className="h-16 grayscale opacity-80"
              title="Asociación Herrera"
            />
            <img
              src="/images/logo-alianza-2.png"
              alt="Logo Alianza 2"
              className="h-20 grayscale opacity-80"
              title="Comité SALSA"
            />
            <img
              src="/images/logo-alianza-3.png"
              alt="Logo Alianza 3"
              className="h-16 grayscale opacity-80"
              title="Artesanal Comité SALSA"
            />
            {/* Puedes añadir más logos aquí */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUsPage;
