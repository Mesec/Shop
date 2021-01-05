const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  brand: { type: String, required: true },
  image: { type: String, required: true },
  amount: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  comments: { type: Array, required: false },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
