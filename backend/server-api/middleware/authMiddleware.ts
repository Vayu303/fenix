import jwt from "jsonwebtoken";
import { Response, NextFunction, RequestHandler } from "express";
import { User, IUser } from "../models/user";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest";

export const verifyToken: RequestHandler = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res
      .status(401)
      .json({ message: "Accesso negato. Token mancante o malformato." });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };

    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(404).json({ message: "Utente non trovato." });
      return;
    }

    // Assicuriamo che la proprietà `user` sia del tipo `IUser`
    (req as AuthenticatedRequest).user = user.toObject() as IUser;

    next();
  } catch (error) {
    console.error("Errore nella verifica del token:", error);
    res.status(401).json({ message: "Token non valido o scaduto." });
    return;
  }
};
