import express, { Response, NextFunction } from "express";
import { Cart } from "../models/cart";
import { verifyToken } from "../middleware/authMiddleware";

const router = express.Router();

import { Types } from "mongoose";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest";

router.post(
  "/add",
  verifyToken,
  async (req, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { productId, quantity } = req.body;

      // Tipizza `req.user` correttamente
      const user = (req as AuthenticatedRequest).user;

      if (!user || !user._id) {
        res.status(401).json({ message: "Accesso non autorizzato" });
        return;
      }

      // Trova o crea il carrello per l'utente autenticato
      let cart = await Cart.findOne({ user: new Types.ObjectId(user._id) });

      if (!cart) {
        cart = new Cart({ user: user._id, items: [] });
      }

      // Cerca l'articolo esistente nel carrello
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }

      // Salva il carrello aggiornato
      await cart.save();
      res.status(200).json({ message: "Prodotto aggiunto al carrello", cart });
    } catch (err) {
      console.error("Errore durante l'aggiunta al carrello:", err);
      res.status(500).json({ message: "Errore del server" });
    }
  }
);
