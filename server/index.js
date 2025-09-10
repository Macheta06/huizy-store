// server/index.js

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); 

// Importar rutas
const productRoutes = require('./routes/products.routes.js');

const app = express();
const PORT = 5000;
const MONGO_URI = process.env.MONGO_URI;

// Conexión a la base de datos
mongoose.connect(MONGO_URI)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch((error) => console.error('Error al conectar a MongoDB Atlas:', error));

// Rutas
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});