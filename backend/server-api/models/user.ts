import { Schema, model, models, Document, Types } from "mongoose";
import bcrypt from "bcryptjs";

// Interfaccia per definire la struttura di un utente
export interface IUser extends Document {
  _id: Types.ObjectId; // Mongoose genera automaticamente questo campo
  email: string;
  password: string;
  name: string;
}

// Definizione dello schema
const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true, // La password sarà hashata prima del salvataggio
  },
  name: {
    type: String,
    required: true,
  },
});

// Pre-save hook per hashare la password
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    console.log("[Pre-Save Hook] Password non modificata, skip hashing.");
    return next();
  }

  console.log("[Pre-Save Hook] Password modificata, eseguo hashing.");
  console.log("[Pre-Save Hook] Password prima dell'hashing:", this.password);

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  console.log("[Pre-Save Hook] Password dopo l'hashing:", this.password);
  next();
});

// Definizione del modello
const User = models.User || model<IUser>("User", UserSchema);

export { User };
