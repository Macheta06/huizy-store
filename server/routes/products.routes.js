import express from "express";
import mongoose from "mongoose";
import Product from "../models/product.model.js";
import { protect, admin } from "../middleware/auth.middleware.js";

const router = express.Router();

// Middleware interno para validar ObjectId y evitar errores de casting de MongoDB
const validateId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "ID de producto no válido" });
  }
  next();
};

// @desc    Obtener todos los productos
// @route   GET /api/products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos" });
  }
});

// @desc    Obtener un producto por ID
// @route   GET /api/products/:id
router.get("/:id", validateId, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" });
  }
});

// @desc    Crear un producto
// @route   POST /api/products
router.post("/", protect, admin, async (req, res) => {
  try {
    // Definimos explícitamente qué campos aceptamos (Whitelist)
    const {
      name,
      description,
      category,
      imageUrl,
      ingredients,
      presentations,
    } = req.body;

    const product = new Product({
      name,
      description,
      category,
      imageUrl,
      ingredients,
      presentations,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Datos de producto inválidos", error: error.message });
  }
});

// @desc    Actualizar un producto
// @route   PUT /api/products/:id
router.put("/:id", protect, admin, validateId, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      // Actualización controlada (Whitelist)
      product.name = req.body.name || product.name;
      product.description = req.body.description || product.description;
      product.category = req.body.category || product.category;
      product.imageUrl = req.body.imageUrl || product.imageUrl;
      product.ingredients = req.body.ingredients || product.ingredients;
      product.presentations = req.body.presentations || product.presentations;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al actualizar producto", error: error.message });
  }
});

// @desc    Eliminar un producto
// @route   DELETE /api/products/:id
router.delete("/:id", protect, admin, validateId, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.json({ message: "Producto eliminado" });
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar producto" });
  }
});

export default router;
