import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    idNumber: { type: String, required: true },
    address: { type: String, required: true },
    cityNeighborhood: { type: String, required: true },
    phone: { type: String, required: true },
    locationType: { type: String, required: true },
    weekdayAvailability: [{ type: String }],
    preferDropOff: { type: String, required: true },
    comments: { type: String },
    status: {
      type: String,
      required: true,
      default: "Pendiente",
      enum: ["Pendiente", "Completada", "Cancelada"], // Restringimos los estados posibles
    },
    // Campo de auditoría: Referencia al administrador que procesó la recolección
    completedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

const Collection = mongoose.model("Collection", collectionSchema);
export default Collection;
