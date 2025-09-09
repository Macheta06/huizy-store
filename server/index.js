// 1. Importar Express
const express = require('express');

// 2. Crear una instancia de la aplicación Express
const app = express();

// 3. Definir el puerto en el que correrá el servidor
const PORT = 5000; 

// 4. Crear nuestro primer endpoint de prueba
// Cuando alguien haga una petición GET a la raíz '/', se ejecutará esta función
app.get('/', (req, res) => {
  res.send('¡Huizy server con nodemon!');
});

// 5. Poner el servidor a "escuchar" en el puerto definido
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});