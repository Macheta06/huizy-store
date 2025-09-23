// server/routes/order.routes.js
const express = require("express");
const router = express.Router();
const Order = require("../models/order.model.js");
const { protect } = require("../middleware/auth.middleware.js");

router.post("/", protect, async (req, res) => {
  try {
    const { orderItems, shippingInfo, totalPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ message: "No hay productos en la orden" });
    }

    const order = new Order({
      user: req.user.id, // Obtenemos el ID del usuario desde el token verificado
      orderItems: orderItems.map((item) => ({
        ...item,
        product: item._id, // Mapeamos el ID del producto
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

module.exports = router;
