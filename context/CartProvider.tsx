"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "../app/data/products";

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalItems: number;
  loading: boolean;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const CART_STORAGE_KEY = "cartItems";
  const CART_EXPIRY_KEY = "cartExpiry";

  const getCartFromLocalStorage = () => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    const expiry = localStorage.getItem(CART_EXPIRY_KEY);
    if (storedCart && expiry) {
      const expiryDate = new Date(expiry);
      const now = new Date();
      if (now < expiryDate) {
        return JSON.parse(storedCart);
      } else {
        localStorage.removeItem(CART_STORAGE_KEY);
        localStorage.removeItem(CART_EXPIRY_KEY);
      }
    }
    return [];
  };

  const saveCartToLocalStorage = (items: CartItem[]) => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 1);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    localStorage.setItem(CART_EXPIRY_KEY, expiryDate.toISOString());
  };

  useEffect(() => {
    const initialCart = getCartFromLocalStorage();
    setCartItems(initialCart);
    setLoading(false); // Imposta loading a false dopo il recupero
  }, []);

  useEffect(() => {
    if (!loading) {
      // Salva in localStorage solo quando il caricamento è completo
      saveCartToLocalStorage(cartItems);
    }
  }, [cartItems, loading]);

  const addToCart = async (product: Product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (!existingItem) {
      try {
        const response = await fetch("/api/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ product }),
        });
        if (response.ok) {
          const data = await response.json();
          setCartItems(data.cartItems);
        } else {
          console.error(
            "Errore nell'aggiunta al carrello:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Errore nell'aggiunta al carrello:", error);
      }
    } else {
      console.log("Questo prodotto è già nel carrello.");
    }
  };

  const removeFromCart = async (id: number) => {
    try {
      const response = await fetch("/api/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        // Filtra l'elemento da rimuovere e aggiorna il carrello
        const updatedCartItems = cartItems.filter((item) => item.id !== id);
        setCartItems(updatedCartItems);
        // Salva i dati aggiornati nel localStorage
        saveCartToLocalStorage(updatedCartItems);
      } else {
        console.error(
          "Errore nella rimozione dal carrello:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Errore nella rimozione dal carrello:", error);
    }
  };

  const clearCart = async () => {
    try {
      const response = await fetch("/api/cart/clear", {
        method: "DELETE",
      });
      if (response.ok) {
        setCartItems([]);
        localStorage.removeItem(CART_STORAGE_KEY);
        localStorage.removeItem(CART_EXPIRY_KEY);
      }
    } catch (error) {
      console.error("Errore nello svuotamento del carrello:", error);
    }
  };

  const totalItems = cartItems.length;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        totalItems,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
