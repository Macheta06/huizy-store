import express from "express";
import rateLimit from "express-rate-limit";
import { protect, admin } from "../middleware/auth.middleware.js";
import Collection from "../models/collectionRequest.model.js";

const router = express.Router();

// Configuración del Rate Limiter (Anti-SPAM)
// Limita a 5 solicitudes de recolección por hora por IP
const collectionRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 5,
  message: {
    message:
      "Demasiadas solicitudes de recolección desde esta IP. Intenta de nuevo en una hora.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// @desc    Obtener todas las solicitudes (Con Paginación)
// @route   GET /api/collections
router.get("/", protect, admin, async (req, res) => {
  try {
    // Lógica de Paginación
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;

    const count = await Collection.countDocuments({});
    const collections = await Collection.find({})
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      collections,
      page,
      pages: Math.ceil(count / pageSize),
      total: count,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las solicitudes" });
  }
});

// @desc    Crear solicitud de recolección (Anti-SPAM + Whitelist)
// @route   POST /api/collections
router.post("/", collectionRateLimiter, async (req, res) => {
  try {
    // Whitelisting (Anti-Mass Assignment)
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

    const newCollection = new Collection({
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

    const savedCollection = await newCollection.save();
    res.status(201).json(savedCollection);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al crear la solicitud", error: error.message });
  }
});

// @desc    Actualizar estado de solicitud
// @route   PUT /api/collections/:id/status
router.put("/:id/status", protect, admin, async (req, res) => {
  try {
    const { status } = req.body; // Solo permitimos actualizar el estado

    const collection = await Collection.findById(req.params.id);

    if (collection) {
      collection.status = status || collection.status;
      const updatedCollection = await collection.save();
      res.json(updatedCollection);
    } else {
      res.status(404).json({ message: "Solicitud no encontrada" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar el estado" });
  }
});

export default router;
