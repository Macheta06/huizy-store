// server/middleware/auth.middleware.js
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protect = async (req, res, next) => {
  let token;

  // Verificamos si el token viene en el header Authorization como "Bearer TOKEN"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Decodificamos el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Buscamos al usuario y lo agregamos al objeto 'req' (sin el password)
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error("❌ Error de token:", error.message);
      res.status(401).json({ message: "No autorizado, token fallido" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "No autorizado, falta el token" });
  }
};

// Middleware para verificar si es administrador
export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: "No autorizado como administrador" });
  }
};
