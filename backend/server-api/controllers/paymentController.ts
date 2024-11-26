import { Request, Response } from "express";
import Stripe from "stripe";
import { Order } from "../models/order";
import dbConnect from "../utils/dbConnect";
import mongoose from "mongoose";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15" as Stripe.LatestApiVersion,
});

export const createCheckoutSession = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await dbConnect();

    const { userId, items, total, shippingAddress } = req.body;

    if (!userId || !items || !total || !shippingAddress) {
      res.status(400).json({
        message:
          "Tutti i campi sono obbligatori: userId, items, total, shippingAddress",
      });
      return;
    }

    // Validate and transform items
    const validatedItems = items.map((item: any) => {
      if (!mongoose.isValidObjectId(item.productId)) {
        throw new Error(`Invalid productId: ${item.productId}`);
      }

      return {
        productId: new mongoose.Types.ObjectId(item.productId),
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      };
    });

    // Validate userId
    const validUserId = userId.toString();
    if (!mongoose.isValidObjectId(validUserId)) {
      throw new Error(`Invalid userId: ${validUserId}`);
    }

    // Create order
    const order = await Order.create({
      user: new mongoose.Types.ObjectId(validUserId),
      items: validatedItems,
      total,
      shippingAddress,
      status: "pending",
      paymentStatus: "pending",
      orderStatus: "processing",
    });

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: validatedItems.map((item: any) => ({
        price_data: {
          currency: "eur",
          product_data: { name: item.name },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${
        process.env.CLIENT_URL
      }/success?orderId=${order._id.toString()}`,
      cancel_url: `${
        process.env.CLIENT_URL
      }/cancel?orderId=${order._id.toString()}`,
      metadata: {
        orderId: order._id.toString(),
      },
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error(
      "Errore durante la creazione della sessione di pagamento:",
      error
    );
    res.status(500).json({
      message: "Errore durante la creazione della sessione di pagamento.",
    });
  }
};
