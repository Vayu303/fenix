import jwt from "jsonwebtoken";
import { RequestHandler } from "express";
import { User, IUser } from "../models/user";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest";

export const verifyToken: RequestHandler = async (req, res, next) => {
  // Leggi il token dai cookie o dagli header
  const token =
    req.cookies?.jwt || (req.headers.authorization || "").split(" ")[1];
  if (!token) {
    console.error("Token mancante");
    res.status(401).json({ message: "Accesso negato. Token mancante." });
    return;
  }

  if (!token) {
    res.status(401).json({
      message: "Accesso negato. Token mancante.",
    });
    return;
  }

  try {
    // Decodifica il token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };

    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(404).json({ message: "Utente non trovato." });
      return;
    }

    // Aggiungi l'utente alla richiesta
    (req as AuthenticatedRequest).user = user.toObject() as IUser;

    next();
  } catch (error) {
    console.error("Errore nella verifica del token:", error);
    res.status(401).json({ message: "Token non valido o scaduto." });
    return;
  }
};
