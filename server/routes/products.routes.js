// server/routes/products.routes.js

const express = require('express');
const router = express.Router();

// --- DEFINICIÓN DE RUTAS PARA PRODUCTOS ---

// GET /api/products/ - Obtener todos los productos
router.get('/', (req, res) => {
  res.json({ message: 'Aquí se enviará la lista de todos los productos de Huizy' });
});

// GET /api/products/:id - Obtener un producto específico por su ID
router.get('/:id', (req, res) => {
  const productId = req.params.id;
  res.json({ message: `Aquí se enviarán los detalles del producto con ID: ${productId}` });
});

module.exports = router;