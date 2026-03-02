// server/routes/collection.routes.js
const express = require("express");
const router = express.Router();
const CollectionRequest = require("../models/collectionRequest.model.js");
const { protect, admin } = require("../middleware/auth.middleware.js");

router.post("/", async (req, res) => {
  try {
    const {
      email,
      fullName,
      idNumber,
      address,
      cityNeighborhood,
      phone,
      locationType,
      weekdayAvailability,
      preferDropOff,
      comments,
    } = req.body;

    const newRequest = new CollectionRequest({
      email,
      fullName,
      idNumber,
      address,
      cityNeighborhood,
      phone,
      locationType,
      weekdayAvailability,
      preferDropOff,
      comments,
    });

    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (error) {
    console.error("Error al guardar solicitud:", error);
    res.status(500).json({
      message: "Error en el servidor al guardar la solicitud",
      error: error.message,
    });
  }
});

router.get("/", protect, admin, async (req, res) => {
  try {
    const requests = await CollectionRequest.find({}).sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    console.error("Error al obtener solicitudes:", error);
    res
      .status(500)
      .json({ message: "Error en el servidor al obtener las solicitudes" });
  }
});

router.put("/:id/status", protect, admin, async (req, res) => {
  try {
    const requestId = req.params.id;
    const { status } = req.body;

    if (status !== "Pendiente" && status !== "Completada") {
      return res.status(400).json({ message: "Estado no válido" });
    }

    const request = await CollectionRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Solicitud no encontrada" });
    }

    request.status = status; // Actualiza el estado
    const updatedRequest = await request.save(); // Guarda los cambios

    res.json(updatedRequest);
  } catch (error) {
    console.error("Error al actualizar estado:", error);
    res
      .status(500)
      .json({ message: "Error en el servidor al actualizar el estado" });
  }
});

module.exports = router;
