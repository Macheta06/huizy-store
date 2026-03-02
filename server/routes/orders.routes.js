import express from "express";
import mongoose from "mongoose";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import { protect, admin } from "../middleware/auth.middleware.js";

const router = express.Router();

// @desc    Crear nueva orden con validación de stock y precio
// @route   POST /api/orders
router.post("/", protect, async (req, res) => {
  const { orderItems, shippingInfo } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: "No hay productos en la orden" });
  }

  // 1. Iniciamos una Sesión para la Transacción (Atomicidad)
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    let totalPrice = 0;
    const finalOrderItems = [];

    for (const item of orderItems) {
      // 2. Buscamos el producto directamente en la DB dentro de la sesión
      const dbProduct = await Product.findById(item._id).session(session);

      if (!dbProduct) {
        throw new Error(`Producto no encontrado: ${item.name}`);
      }

      // 3. Encontramos la presentación exacta
      const presentation = dbProduct.presentations.find(
        (p) => p.weight === item.weight,
      );

      if (!presentation) {
        throw new Error(
          `Presentación ${item.weight} no existe para ${item.name}`,
        );
      }

      // 4. VERIFICACIÓN DE STOCK (Evita Race Condition)
      if (presentation.stock < item.quantity) {
        throw new Error(
          `Stock insuficiente para ${item.name} (${item.weight})`,
        );
      }

      // 5. RECALCULO DE PRECIO EN BACKEND (Seguridad total)
      const itemPrice = presentation.price;
      totalPrice += itemPrice * item.quantity;

      // 6. DESCUENTO DE STOCK ATÓMICO ($inc con valor negativo)
      await Product.updateOne(
        { _id: item._id, "presentations.weight": item.weight },
        { $inc: { "presentations.$.stock": -item.quantity } },
        { session },
      );

      finalOrderItems.push({
        name: dbProduct.name,
        quantity: item.quantity,
        imageUrl: dbProduct.imageUrl,
        price: itemPrice,
        weight: presentation.weight,
        product: dbProduct._id,
      });
    }

    // 7. CREACIÓN DE LA ORDEN (Solo con campos permitidos - Whitelist)
    const order = new Order({
      user: req.user._id,
      orderItems: finalOrderItems,
      shippingInfo,
      totalPrice,
    });

    const createdOrder = await order.save({ session });

    // Si todo salió bien, confirmamos los cambios
    await session.commitTransaction();
    session.endSession();

    res.status(201).json(createdOrder);
  } catch (error) {
    // Si algo falla (ej. stock insuficiente), revertimos TODO
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ message: error.message });
  }
});

// @desc    Obtener órdenes del usuario logueado
// @route   GET /api/orders/myorders
router.get("/myorders", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener tus pedidos" });
  }
});

// @desc    Obtener todas las órdenes (Solo Admin)
router.get("/", protect, admin, async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener órdenes" });
  }
});

export default router;
