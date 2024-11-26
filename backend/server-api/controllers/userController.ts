import { Request, Response, NextFunction } from "express";
import dbConnect from "../utils/dbConnect";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest";

// Middleware per ottenere il profilo utente
export const getUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await dbConnect();

    // Recupera l'utente autenticato dal middleware
    const user = (req as AuthenticatedRequest).user;
    if (!user) {
      console.error("Utente non trovato o non autenticato.");
      res.status(401).json({ message: "Utente non autenticato." });
      return;
    }

    console.log("Profilo utente recuperato con successo:", {
      id: user._id,
      name: user.name,
      email: user.email,
    });

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error("Errore durante il recupero del profilo:", error);
    next(error);
  }
};
