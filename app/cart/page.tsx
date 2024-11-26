"use client";
import React from "react";
import { useCart } from "../../context/CartProvider";
import Link from "next/link";
import Container from "../components/Container";

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, clearCart, totalItems, loading } =
    useCart();

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <Container>
          <div className=" flex flex-col items-center py-40 space-y-6 text-center justify-center items-center h-100">
            <div className="border-t-4 border-blue-500 w-12 h-12 rounded-full animate-spin"></div>
          </div>
        </Container>
      </div>
    );
  }

  // Calcola il totale sommando i prezzi di ciascun prodotto
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="container mx-auto py-8">
      <Container>
        <h2 className="text-xxl font-bold mb-4">Carrello</h2>
        {cartItems.length === 0 ? (
          <p>Il carrello è vuoto.</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div key={item.id} className="border-b py-4 flex justify-between">
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p>Prezzo: €{item.price}</p>
                  <Link href={`/product/${item.id}`}>
                    <p className="text-blue-600 hover:underline">
                      Dettagli del prodotto
                    </p>
                  </Link>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Rimuovi
                </button>
              </div>
            ))}
            <div className="mt-6 flex justify-between items-center">
              <h3 className="text-xl font-semibold">
                Totale ({totalItems} prodotti): €{total.toFixed(2)}
              </h3>
              <button
                onClick={clearCart}
                className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800"
              >
                Svuota Carrello
              </button>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default CartPage;
