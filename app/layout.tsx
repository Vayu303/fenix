import dotenv from "dotenv";

dotenv.config(); // Carica il file .env
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/nav/NavBar";
import Footer from "./components/footer/Footer";
import React from "react";
import { CartProvider } from "../context/CartProvider";
import CookieBanner from "./components/CookieBanner";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
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
      <body
  className={`${inter.className} antialiased text-slate-900 m-0 p-0`}
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
