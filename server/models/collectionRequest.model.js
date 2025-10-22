// server/models/collectionRequest.model.js
const mongoose = require("mongoose");

const collectionRequestSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, trim: true },
    fullName: { type: String, required: true, trim: true },
    idNumber: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    cityNeighborhood: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    locationType: { type: String, required: true },
    weekdayAvailability: { type: [String], default: [] }, // Array de strings
    preferDropOff: { type: String, required: true },
    comments: { type: String, trim: true },
    status: {
      type: String,
      enum: ["Pendiente", "Completada"],
      default: "Pendiente",
    },
  },
  {
    timestamps: true, // Guarda fecha de creación y actualización
  }
);

const CollectionRequest = mongoose.model(
  "CollectionRequest",
  collectionRequestSchema
);
module.exports = CollectionRequest;
