import dotenv from "dotenv";

dotenv.config(); // Carica il file .env
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import NavBar from "./components/nav/NavBar";
import Footer from "./components/footer/Footer";
import React from "react";
import { CartProvider } from "../context/CartProvider";
import CookieBanner from "./components/CookieBanner";

const poppins = Poppins({
  subsets: ["latin"],

  weight: ["300", "900"],
});

export const metadata: Metadata = {
  title: "Fenix Vintage Shop",
  description: "Online Shop di antiquariato",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={`${poppins.className}
      antialiased
      text-slate-700
      m-0
      p-0
      `}
      >
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <NavBar />

            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <CookieBanner />
        </CartProvider>
      </body>
    </html>
  );
}
