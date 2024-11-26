import { Response } from "express";
import mongoose from "mongoose";
import { Order } from "../models/order";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest";

export const createPreliminaryOrder = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { items, total } = req.body;

    if (!req.user || !items || !total) {
      res.status(400).json({
        message: "Tutti i campi sono obbligatori: user, items, total",
      });
      return;
    }

    const validatedItems = items.map((item: any) => ({
      productId: new mongoose.Types.ObjectId(item.productId),
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    const order = await Order.create({
      user: req.user._id,
      items: validatedItems,
      total,
      status: "draft",
    });

    res.status(201).json({ orderId: order._id });
  } catch (error) {
    console.error(
      "Errore durante la creazione dell'ordine preliminare:",
      error
    );
    res.status(500).json({
      message: "Errore del server durante la creazione dell'ordine",
    });
  }
};
