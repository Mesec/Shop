const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  fullName: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: Number, required: true },
  products: [{ type: Object, required: true }],
  totalPrice: { type: Number, required: true },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
