// server/index.js

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

import productRoutes from "./routes/products.routes.js";
import authRoutes from "./routes/auth.routes.js";
import orderRoutes from "./routes/orders.routes.js";
import collectionRoutes from "./routes/collections.routes.js";

const app = express();

// Middlewares
app.use(
  cors({
    origin: "https://somoshuizy.vercel.app",
  }),
);
app.use(express.json());

// Rutas
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/collections", collectionRoutes);

// Conexión a MongoDB
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Conectado a MongoDB Atlas");
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error de conexión a MongoDB:", error.message);
  });
