// server/routes/auth.routes.js
import express from "express";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Función auxiliar para generar JWT (Helper)
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" },
  );
};

// @desc    Registro de usuario
// @route   POST /api/auth/register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "El usuario ya existe" });

    const user = await User.create({ name, email, password });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  } catch (error) {
    res.status(400).json({ message: "Datos inválidos" });
  }
});

// @desc    Login de usuario
// @route   POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // Nota: El método matchPassword debe estar definido en tu User Model
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      });
    } else {
      res.status(401).json({ message: "Email o contraseña incorrectos" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
});

export default router;
