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

module.exports = router;
