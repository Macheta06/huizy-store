// server/index.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Importar rutas
const productRoutes = require("./routes/products.routes.js");
const authRoutes = require("./routes/auth.routes.js");
const orderRoutes = require("./routes/order.routes.js");

const app = express();
const PORT = 5000;
const MONGO_URI = process.env.MONGO_URI;

// Conexión a la base de datos
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Conectado a MongoDB Atlas"))
  .catch((error) => console.error("Error al conectar a MongoDB Atlas:", error));

app.use(
  cors({
    origin: "https://somoshuizy.vercel.app",
  })
);

// Middleware para que Express entienda el body de las peticiones en formato JSON
app.use(express.json());

// Rutas
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});
