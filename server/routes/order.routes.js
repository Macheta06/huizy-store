// server/routes/order.routes.js
const express = require("express");
const router = express.Router();
const Order = require("../models/order.model.js");
const Product = require("../models/product.model.js");
const { protect } = require("../middleware/auth.middleware.js");

router.post("/", protect, async (req, res) => {
  try {
    const { orderItems, shippingInfo, totalPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ message: "No hay productos en la orden" });
    }

    for (const item of orderItems) {
      const product = await Product.findById(item._id);

      if (product) {
        const presentation = product.presentations.find(
          (p) => p.weight === item.weight
        );

        if (presentation) {
          if (presentation.stock < item.quantity) {
            return res.status(400).json({
              message: `Stock insuficiente para ${product.name} (${presentation.weight}). Disponible: ${presentation.stock}`,
            });
          }
          presentation.stock -= item.quantity;
        } else {
          return res.status(400).json({
            message: `Presentación ${item.weight} no encontrada para ${product.name}`,
          });
        }
        await product.save();
      } else {
        return res
          .status(404)
          .json({ message: `Producto con ID ${item._id} no encontrado` });
      }
    }

    const order = new Order({
      user: req.user.id,
      orderItems: orderItems.map((item) => ({
        product: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        weight: item.weight,
        imageUrl: item.imageUrl,
      })),
      shippingInfo,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor al crear la orden" });
  }
});

router.get("/myorders", protect, async (req, res) => {
  try {
    // Buscamos todas las órdenes donde el campo 'user' coincida con el id del usuario del token
    const orders = await Order.find({ user: req.user.id }).sort({
      createdAt: -1,
    }); // Ordena por fecha de creación descendente
    res.json(orders);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error en el servidor al obtener las órdenes" });
  }
});

module.exports = router;
