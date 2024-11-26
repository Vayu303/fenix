"use client";
import React, { useState, useEffect } from "react";
import Container from "./Container";

const CookieBanner: React.FC = () => {
  // const [isVisible, setIsVisible] = useState(false);

  // useEffect(() => {
  // Mostra il banner solo se l'utente non ha già accettato i cookie
  //const hasAcceptedCookies = localStorage.getItem("cookiesAccepted");
  // if (!hasAcceptedCookies) {
  // setIsVisible(true);
  //}
  //}, []);

  //const handleAccept = () => {
  // Memorizza l'accettazione nei localStorage
  // localStorage.setItem("cookiesAccepted", "true");
  //setIsVisible(false);
  //};

  const [isVisible, setIsVisible] = useState(true); // Mostra sempre il banner

  const handleAccept = () => {
    // Logica per accettare i cookie (non salviamo nulla per ora)
    setIsVisible(false);
  };

  return (
    <div
      className={`fixed bottom-0 left-0 w-full bg-gray-800 text-white z-50 transform transition-transform duration-500 shadow-2xl ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-6 px-6">
          <p className="text-sm md:text-base text-center md:text-left">
            Questo sito utilizza solo i cookies strettamente necessari per il
            suo corretto funzionamento; <br /> per questo motivo non disponiamo
            di preferenze utente. Leggi la nostra{" "}
            <a
              href="/cookie-policy"
              target="_blank"
              className="underline text-red-500 hover:text-red-500"
            >
              Politica sui Cookie
            </a>
            .
          </p>
          <button
            onClick={handleAccept}
            className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Accetta
          </button>
        </div>
      </Container>
    </div>
  );
};

export default CookieBanner;
