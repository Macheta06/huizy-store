import mongoose from "mongoose";

const presentationSchema = new mongoose.Schema({
  weight: { type: String, required: true },
  price: { type: Number, required: true },
  stock: {
    type: Number,
    required: true,
    min: [0, "El stock no puede ser negativo"], // Validación de integridad
  },
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      required: true,
      index: true, // Indexación para mejorar la velocidad de búsqueda/filtrado
    },
    imageUrl: { type: String, required: true },
    ingredients: [{ type: String }],
    presentations: [presentationSchema],
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);
export default Product;
