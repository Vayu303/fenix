"use client";
import React, { useState } from "react";
import { useCart } from "../../context/CartProvider";
import Link from "next/link";
import Container from "../components/Container";
import CheckoutButton from "../components/CheckoutButton";
import { FaTrashAlt, FaCartPlus } from "react-icons/fa";

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, clearCart, totalItems, loading } =
    useCart();
  const [removing, setRemoving] = useState<number | null>(null);

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <Container>
          <div className="flex flex-col items-center py-40 space-y-6 text-center justify-center h-100">
            <div className="border-t-4 border-blue-500 w-12 h-12 rounded-full animate-spin"></div>
          </div>
        </Container>
      </div>
    );
  }

  // Calcola il totale sommando i prezzi di ciascun prodotto
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleRemove = (id: number) => {
    setRemoving(id);
    setTimeout(() => {
      removeFromCart(id);
      setRemoving(null);
    }, 500); // Durata dell'animazione
  };

  return (
    <div className="container mx-auto py-40">
      <Container>
        <h2 className="text-4xl font-extrabold mb-8 text-gray-800 text-center">
          Il Tuo Carrello
        </h2>
        {cartItems.length === 0 ? (
          <div className="text-center mt-20">
            <p className="text-lg text-gray-600 mb-4">Il tuo carrello è vuoto!</p>
            <Link
              href="/catalogo"
              className="inline-block bg-red-700 text-white px-6 py-3 rounded-md hover:bg-red-800 transition"
            >
              Vai al Catalogo
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className={`border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition relative flex flex-col justify-between ${
                  removing === item.id ? "animate-fade-out" : ""
                }`}
              >
                <div>
                  <h3 className="font-bold text-lg text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">Prezzo: €{item.price.toFixed(2)}</p>
                  <Link href={`/product/${item.id}`}>
                    <p className="text-blue-600 hover:underline mt-2">
                      Dettagli del prodotto
                    </p>
                  </Link>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="absolute top-4 right-4 text-red-600 hover:text-red-800 flex items-center gap-1"
                >
                  <FaTrashAlt className="w-4 h-4" /> Rimuovi
                </button>
              </div>
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="mt-10 border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <h3 className="text-2xl font-semibold text-gray-800">
              Totale ({totalItems} prodotti): €{total.toFixed(2)}
            </h3>
            <div className="flex gap-4">
              <button
                onClick={clearCart}
                className="bg-red-700 text-white px-6 py-2 rounded-md hover:bg-red-800 flex items-center gap-2"
              >
                <FaTrashAlt /> Svuota Carrello
              </button>
              <CheckoutButton />
            </div>
          </div>
        )}
      </Container>
      <style jsx>{`
        .animate-fade-out {
          animation: fadeOut 0.5s ease-in-out forwards;
        }

        @keyframes fadeOut {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          50% {
            opacity: 0.5;
            transform: translateY(-10px) scale(0.95);
          }
          100% {
            opacity: 0;
            transform: translateY(-20px) scale(0.9);
          }
        }
      `}</style>
    </div>
  );
};

export default CartPage;
