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
      className="fixed bottom-6 left-6 z-50 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition-colors duration-300 transform hover:scale-110"
      aria-label="Chatear en WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.996 0-3.903-.52-5.607-1.476l-6.167 1.68zM7.477 6.384c.313-.306.708-.466 1.132-.464.457.004.881.182 1.211.518.341.348.513.805.517 1.296.002.454-.154.887-.464 1.21-.307.313-.708.467-1.132.465-.457-.004-.881-.183-1.211-.518-.341-.349-.513-.806-.517-1.296-.002-.454.154-.887.464-1.211zm4.846 7.42c.594.3 1.228.459 1.878.458 2.232.003 4.045-1.81 4.05-4.043.002-2.228-1.804-4.038-4.037-4.041-2.233-.003-4.046 1.809-4.05 4.043-.001.666.16 1.32.479 1.898l-.164.545-1.442.427.439-1.427.536-.169zm6.337 5.243c-1.458 1.189-3.267 1.853-5.14 1.851-4.741 0-8.598-3.86-8.599-8.601.001-4.74 3.857-8.597 8.599-8.597 2.257.002 4.381.872 5.961 2.451 1.582 1.582 2.454 3.707 2.456 5.967-.003 4.741-3.859 8.598-8.601 8.598z" />
      </svg>
    </a>
  );
}

export default FloatingWhatsApp;
