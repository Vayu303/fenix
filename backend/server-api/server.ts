import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import mongoose from "mongoose";
import loginRoutes from "./routes/login/route";
import registerRoutes from "./routes/register/route";
import profileRoutes from "./routes/profile/route";
import paymentRoutes from "./routes/payment/route";
import checkoutRoutes from "./routes/checkout/route";
import cookieParser from "cookie-parser";
import logoutRoutes from "./routes/logout/route";

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // URL del frontend
    credentials: true, // Necessario se invii cookie o header di autenticazione
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());

// Collegamento al database
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("Connesso a MongoDB"))
  .catch((err) => console.error("Errore connessione MongoDB:", err));

// Rotte API
app.use("/server-api/login", loginRoutes);
app.use("/server-api/register", registerRoutes);
app.use("/server-api/profile", profileRoutes);
app.use("/server-api/logout", logoutRoutes);
app.use("/server-api/payment", paymentRoutes);
app.use("/server-api/checkout", checkoutRoutes);

// Avvio del server
app.listen(PORT, () => {
  console.log(`Server avviato sulla porta ${PORT}`);
});
