// server/models/product.model.js

const mongoose = require('mongoose');

// Definimos la estructura para las variantes de un producto
const presentationSchema = new mongoose.Schema({
  weight: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    default: 0 // Por defecto, el stock será 0
  }
});

// Definimos el Schema principal para los productos
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // El nombre es obligatorio
    trim: true      // Elimina espacios en blanco al inicio y al final
  },
  description: {
    type: String,
    required: true
  },
  ingredients: {
    type: [String] 
  },
  category: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true // La URL de la imagen será obligatoria
  },
  presentations: [presentationSchema] // Un producto puede tener múltiples presentaciones
}, {
  timestamps: true // Esto añade automáticamente los campos createdAt y updatedAt
});

// Creamos el Modelo a partir del Schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;