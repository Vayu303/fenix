// app/api/cart/route.ts
import { NextResponse } from "next/server";
import { CartItem } from "../../../context/CartProvider";

let cart: CartItem[] = []; // Array per memorizzare gli elementi del carrello

export async function GET() {
  return NextResponse.json({ cartItems: cart });
}

export async function POST(req: Request) {
  try {
    const { product } = await req.json();
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    return NextResponse.json({ cartItems: cart });
  } catch (error) {
    console.error("Errore nell'aggiunta al carrello:", error);
    return NextResponse.json(
      { error: "Impossibile aggiungere il prodotto al carrello" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    cart = cart.filter((item) => item.id !== id);

    return NextResponse.json({ cartItems: cart });
  } catch (error) {
    console.error("Errore nella rimozione dal carrello:", error);
    return NextResponse.json(
      { error: "Impossibile rimuovere il prodotto dal carrello" },
      { status: 500 }
    );
  }
}
