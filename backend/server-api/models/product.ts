import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  category: String,
  novità: Boolean,
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
