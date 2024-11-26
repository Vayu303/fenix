import mongoose, { Schema, model, models, Types, Document } from "mongoose";

// Define the IOrder interface
interface IOrder extends Document {
  _id: Types.ObjectId; // Explicitly define _id as an ObjectId
  user: Types.ObjectId;
  items: {
    productId: Types.ObjectId;
    name: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  status:
    | "draft"
    | "pending"
    | "confirmed"
    | "shipped"
    | "completed"
    | "cancelled";
  paymentStatus: "pending" | "completed" | "failed";
  orderStatus: "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

// Define the Order schema
const OrderSchema = new mongoose.Schema<IOrder>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  shippingAddress: {
    fullName: {
      type: String,
      required: function () {
        return this.status !== "draft"; // Obbligatorio solo se non è in stato "draft"
      },
    },
    street: {
      type: String,
      required: function () {
        return this.status !== "draft"; // Obbligatorio solo se non è in stato "draft"
      },
    },
    city: {
      type: String,
      required: function () {
        return this.status !== "draft"; // Obbligatorio solo se non è in stato "draft"
      },
    },
    postalCode: {
      type: String,
      required: function () {
        return this.status !== "draft"; // Obbligatorio solo se non è in stato "draft"
      },
    },
    country: {
      type: String,
      required: function () {
        return this.status !== "draft"; // Obbligatorio solo se non è in stato "draft"
      },
    },
  },
  status: {
    type: String,
    enum: [
      "draft",
      "pending",
      "confirmed",
      "shipped",
      "completed",
      "cancelled",
    ],
    default: "draft",
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  orderStatus: {
    type: String,
    enum: ["processing", "shipped", "delivered", "cancelled"],
    default: "processing",
  },
});

// Create the model with the IOrder interface
const Order = mongoose.model<IOrder>("Order", OrderSchema);

export { Order };
