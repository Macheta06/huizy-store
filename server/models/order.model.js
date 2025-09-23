// server/models/order.model.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  weight: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId, // Referencia al usuario que hizo la orden
      ref: "User",
      required: true,
    },
    orderItems: [orderItemSchema],
    shippingInfo: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      email: { type: String, required: true },
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
