"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { useCart } from "../../context/CartProvider";
import { useState } from "react";

axios.defaults.baseURL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const CheckoutButton = () => {
  const router = useRouter();
  const { cartItems } = useCart();
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!userId || !token) {
        setError("Non sei autenticato. Effettua il login.");
        router.push("/userdashboard");
        return;
      }

      if (cartItems.length === 0) {
        setError(
          "Il carrello è vuoto. Aggiungi dei prodotti prima di procedere."
        );
        return;
      }

      const response = await axios.post(
        "/server-api/checkout/create-order",
        {
          userId,
          items: cartItems.map((item) => ({
            productId: item.id, // Assicurati che sia una stringa valida
            name: item.title,
            price: item.price,
            quantity: item.quantity,
          })),
          total: cartItems.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          ),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { orderId } = response.data;

      if (orderId) {
        router.push(`/checkout/shipping?orderId=${orderId}`);
      } else {
        throw new Error("ID ordine non trovato nella risposta.");
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error("Errore durante il checkout:", err.message);
        setError(err.message || "Errore durante il checkout.");
      } else {
        console.error("Errore sconosciuto durante il checkout:", err);
        setError("Errore sconosciuto durante il checkout.");
      }
    }
  };

  return (
    <div>
      {error && <p className="text-red-700 mb-4">{error}</p>}
      <button
        onClick={handleCheckout}
        className="bg-green-800 text-white px-4 py-2 rounded hover:bg-green-900"
      >
        Procedi al Checkout
      </button>
    </div>
  );
};

export default CheckoutButton;
