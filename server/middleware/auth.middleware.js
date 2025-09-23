// server/middleware/auth.middleware.js
const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token;

  // Buscamos el token en los headers de la petición
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extraemos el token (ej: "Bearer eyJhbGci...")
      token = req.headers.authorization.split(" ")[1];

      // Verificamos el token con nuestra palabra secreta
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Adjuntamos el usuario decodificado a la petición para usarlo después
      req.user = decoded.user;
      next(); // Si todo está bien, continuamos a la ruta
    } catch (error) {
      res
        .status(401)
        .json({ message: "Token no válido, autorización denegada" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "No hay token, autorización denegada" });
  }
};

module.exports = { protect };
