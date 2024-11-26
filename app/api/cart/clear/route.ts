// app/api/cart/route.ts
import { NextResponse } from "next/server";
import { CartItem } from "../../../../context/CartProvider";

let cart: CartItem[] = []; // Array per memorizzare gli elementi del carrello
export async function DELETE() {
  try {
    cart = []; // Svuota il carrello
    return NextResponse.json({ cartItems: cart });
  } catch (error) {
    console.error("Errore nello svuotamento del carrello:", error);
    return NextResponse.json(
      { error: "Impossibile svuotare il carrello" },
      { status: 500 }
    );
  }
}
