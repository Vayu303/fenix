"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useCart } from "../../../context/CartProvider";
import axios from "axios";

const ShippingPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cartItems } = useCart();

  const [form, setForm] = useState({
    fullName: "",
    street: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [error, setError] = useState<string | null>(null);

  const orderId = searchParams.get("orderId");

  useEffect(() => {
    if (!orderId) {
      setError("ID ordine mancante. Torna alla dashboard e riprova.");
      router.push("/userdashboard");
    }
  }, [orderId, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!userId || !token) {
        setError("Non sei autenticato. Effettua il login.");
        return;
      }

      // Ottieni i dati di spedizione dal form
      const shippingAddress = {
        fullName: form.fullName,
        street: form.street,
        city: form.city,
        postalCode: form.postalCode,
        country: form.country,
      };

      // Verifica che tutti i campi siano compilati
      if (
        !shippingAddress.street ||
        !shippingAddress.city ||
        !shippingAddress.postalCode ||
        !shippingAddress.country
      ) {
        setError("Tutti i campi di spedizione sono obbligatori.");
        return;
      }

      // Recupera l'ordine preliminare
      const draftOrderId = new URLSearchParams(window.location.search).get(
        "orderId"
      );

      if (!draftOrderId) {
        setError("Ordine preliminare non trovato.");
        return;
      }

      // Effettua la chiamata API per creare la sessione di pagamento
      const response = await axios.post(
        "/server-api/payment/create-checkout-session",
        {
          userId,
          orderId: draftOrderId,
          items: cartItems.map((item) => ({
            productId: item.id,
            name: item.title,
            price: item.price,
            quantity: item.quantity,
          })),
          total: cartItems.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          ),
          shippingAddress,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { url } = response.data;

      if (url) {
        window.location.href = url; // Reindirizza alla pagina di pagamento Stripe
      } else {
        throw new Error("URL di pagamento non trovato nella risposta.");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(
          "Errore durante la creazione della sessione di pagamento:",
          err.response?.data || err.message
        );
        setError(err.response?.data?.message || "Errore durante il pagamento.");
      } else {
        console.error("Errore sconosciuto durante il pagamento:", err);
        setError("Errore sconosciuto durante il pagamento.");
      }
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center text-red-500">
        Il tuo carrello è vuoto. Ritorna allo shop per aggiungere prodotti.
      </div>
    );
  }

  return (
    <div className="p-20 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-12">Dettagli di Spedizione</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form className="space-y-4">
        <input
          type="text"
          name="fullName"
          placeholder="Nome completo"
          value={form.fullName}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="text"
          name="street"
          placeholder="Via"
          value={form.street}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="text"
          name="city"
          placeholder="Città"
          value={form.city}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="text"
          name="postalCode"
          placeholder="Codice Postale"
          value={form.postalCode}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="text"
          name="country"
          placeholder="Paese"
          value={form.country}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />
      </form>
      <div className="mt-6">
        <button
          onClick={handlePayment}
          className="mt-4 bg-green-800 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Procedi al Pagamento
        </button>
      </div>
    </div>
  );
};

export default ShippingPage;
