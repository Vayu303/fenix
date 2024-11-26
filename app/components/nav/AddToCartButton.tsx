"use client";
import React, { useState } from "react";
import { Product } from "../../data/products";
import { useCart } from "../../../context/CartProvider";

interface AddToCartButtonProps {
  product: Product;
  key?: number; // Questa prop non è necessaria se non utilizzi questa chiave in modo specifico
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const { addToCart, cartItems } = useCart(); // Recupera anche cartItems dal contesto
  const [buttonText, setButtonText] = useState("Aggiungi al carrello");

  // Funzione per gestire il click del pulsante "Aggiungi al carrello"
  const handleAddToCart = async () => {
    // Verifica se il prodotto è già presente nel carrello
    const isAlreadyInCart = cartItems.some((item) => item.id === product.id);

    if (isAlreadyInCart) {
      // Se il prodotto è già nel carrello, cambia il testo del bottone
      setButtonText("Prodotto già nel carrello!");
      setTimeout(() => {
        setButtonText("Aggiungi al carrello");
      }, 2000);
    } else {
      try {
        // Altrimenti aggiungi il prodotto al carrello
        await addToCart(product);
        setButtonText("Prodotto aggiunto!");

        // Ripristina il testo del bottone dopo 2 secondi
        setTimeout(() => {
          setButtonText("Aggiungi al carrello");
        }, 2000);
      } catch (error: unknown) {
        if (error instanceof Error) {
          alert(error.message); // Gestione dell'errore
        } else {
          alert("Si è verificato un errore sconosciuto.");
        }
      }
    }
  };

  // Determina le classi CSS per il bottone in base allo stato del testo
  const buttonClass =
    buttonText === "Prodotto già nel carrello!"
      ? "bg-white text-red-800 border-2 border-red-800 hover:bg-red-50 transition"
      : "bg-red-800 text-white border-2 border-red-700 py-2 px-4 rounded hover:bg-red-700 transition";

  return (
    <button
      onClick={handleAddToCart}
      className={`mt-4 ${buttonClass} py-2 px-4 rounded transition`}
    >
      {buttonText}
    </button>
  );
};

export default AddToCartButton;
