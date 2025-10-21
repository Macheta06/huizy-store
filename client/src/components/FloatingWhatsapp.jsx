// client/src/components/FloatingWhatsApp.jsx
import React from "react";

function FloatingWhatsApp() {
  const phone = import.meta.env.VITE_WHATSAPP_NUMBER || "573146042169";
  const message = encodeURIComponent(
    "¡Hola Huizy! 👋 Me gustaría más información sobre sus productos."
  );

  const whatsappURL = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={whatsappURL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition-colors duration-300 transform hover:scale-110"
      aria-label="Chatear en WhatsApp"
    >
      <svg
        fill="currentColor"
        className="h-8 w-8"
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.76-1.653-2.059-.173-.297-.018-.458.13-.606.134-.135.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.508-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.89 9.89 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.89 9.89 0 0 1-1.513-5.26c0-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.895a9.84 9.84 0 0 1 2.895 6.99c0 5.45-4.436 9.884-9.888 9.884m0-21.31c-6.269 0-11.36 5.093-11.36 11.36 0 2.02.524 3.932 1.498 5.618L.004 24l6.356-1.652a11.3 11.3 0 0 0 5.64 1.637h.004c6.269 0 11.36-5.093 11.36-11.36S18.27 1.52 12.002 1.52z" />
      </svg>
    </a>
  );
}

export default FloatingWhatsApp;
