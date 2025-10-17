// client/src/utils/formatMessage.js

export function formatWhatsAppMessage(formData, cart, total) {
  // Formatear los productos
  const itemsText = cart
    .map(
      (item) =>
        `- ${item.name} (${item.presentation.weight}) x ${
          item.quantity
        } = $${new Intl.NumberFormat("es-CO").format(
          item.presentation.price * item.quantity
        )}`
    )
    .join("\n"); // Salto de línea

  // Formatear el total
  const totalText = `*Total: $${new Intl.NumberFormat("es-CO").format(total)}*`;

  // Formatear los datos del cliente
  const clientText = `
*DATOS DEL CLIENTE:*
Nombre: ${formData.name}
Correo: ${formData.email}
Dirección: ${formData.address}
Ciudad: ${formData.city}
`;

  // Mensaje completo
  const message = `
¡Hola Huizy! 👋
Quisiera hacer el siguiente pedido:

*PRODUCTOS:*
${itemsText}

${totalText}
${clientText}

¡Quedo atento/a para coordinar el pago y el envío!
`;
  return message.trim();
}
