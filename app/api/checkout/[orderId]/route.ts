import { NextResponse } from "next/server";
import { Order } from "../../../../backend/server-api/models/order";
import dbConnect from "../../../../backend/server-api/utils/dbConnect";

interface Params {
  params: {
    orderId: string;
  };
}

export const PUT = async (req: Request, context: Params) => {
  const { params } = context;

  try {
    await dbConnect();

    const { orderId } = params;

    const body = await req.json(); // Gestisce il parsing JSON del corpo della richiesta
    const { shippingAddress } = body;

    if (!shippingAddress) {
      return NextResponse.json(
        { message: "Indirizzo di spedizione obbligatorio" },
        { status: 400 }
      );
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return NextResponse.json(
        { message: "Ordine non trovato" },
        { status: 404 }
      );
    }

    // Aggiorna l'ordine
    order.shippingAddress = shippingAddress;
    order.status = "pending";
    await order.save();

    return NextResponse.json({
      message: "Indirizzo aggiornato con successo",
      order,
    });
  } catch (error) {
    console.error("Errore durante l'aggiornamento dell'ordine:", error);
    return NextResponse.json(
      { message: "Errore del server durante l'aggiornamento" },
      { status: 500 }
    );
  }
};
