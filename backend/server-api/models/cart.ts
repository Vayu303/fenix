import { Schema, model, Document } from "mongoose";
import mongoose from "mongoose";
import { User } from "./user"; // Importa il tipo User

// Interfaccia che definisce la struttura del carrello
interface ICart extends Document {
  user: mongoose.Types.ObjectId; // Riferimento all'utente
  items: Array<{
    productId: mongoose.Types.ObjectId; // Riferimento al prodotto
    quantity: number; // Quantità del prodotto
  }>;
}

// Definiamo lo schema per il carrello
const CartSchema = new Schema<ICart>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Riferimento al modello User
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Riferimento al modello Product
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

// Crea il modello per il carrello
const Cart = model<ICart>("Cart", CartSchema);

export { Cart };
