// Importar Express
const express = require('express');
const productRoutes = require('./routes/products.routes.js');

// Crear una instancia de la aplicación Express
const app = express();

// Definir el puerto en el que correrá el servidor
const PORT = 5000; 

// Usa el router de productos con un prefijo
// Le decimos a nuestra app que todas las rutas definidas en 'productRoutes'
// comenzarán con el prefijo '/api/products'
app.use('/api/products', productRoutes);

// Poner el servidor a "escuchar" en el puerto definido
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});