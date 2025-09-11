// server/routes/products.routes.js

const express = require('express');
const router = express.Router();
// Importa el modelo de Producto
const Product = require('../models/product.model.js');

// GET /api/products/ - Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    // Usa el modelo para buscar todos los productos en la BD
    const products = await Product.find();
    res.json(products); // Envía la lista de productos como respuesta
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
  }
});

// GET /api/products/:id - Obtener un producto específico por su ID
router.get('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    // Usa el modelo para buscar un producto por su ID
    const product = await Product.findById(productId);

    if (!product) {
      // Si no se encuentra el producto, devuelve un error 404
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json(product); // Envía el producto encontrado
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
  }
});

// POST /api/products/ - Crear un nuevo producto
router.post('/', async (req, res) => {
  try {
    // req.body contendrá los datos del nuevo producto enviados desde el cliente
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save(); // Guarda el producto en la BD

    // Respondemos con un código 201 (Created) y el producto guardado
    res.status(201).json(savedProduct);
  } catch (error) {
    // Si hay un error de validación (ej: falta un campo requerido), Mongoose lo reportará
    res.status(400).json({ message: 'Error al crear el producto', error: error.message });
  }
});

// PUT /api/products/:id - Actualizar un producto existente
router.put('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedData = req.body;

    // Busca y actualiza el producto por su ID
    const updatedProduct = await Product.findByIdAndUpdate(productId, updatedData, {
      new: true, // Esta opción hace que devuelva el documento actualizado
      runValidators: true, // Para que aplique las validaciones del Schema
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado para actualizar' });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el producto', error: error.message });
  }
});

// DELETE /api/products/:id - Eliminar un producto
router.delete('/:id', async (req, res) => {
  try {
    const productId = req.params.id;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado para eliminar' });
    }

    // Respondemos con un mensaje de éxito
    res.json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
  }
});

module.exports = router;