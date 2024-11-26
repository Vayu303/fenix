"use client";
import React, { useState } from "react";
import { Product } from "../data/products";
import ProductCard from "./ProductCard";

interface NovitaCarouselProps {
  products: Product[];
}

const NovitaCarousel: React.FC<NovitaCarouselProps> = ({ products }) => {
  // Filtra i prodotti con `novita: true`
  const novitaProducts = products.filter((product) => product.novità);

  // Stato per il primo indice visibile
  const [startIndex, setStartIndex] = useState(0);

  // Stato per gestire l'animazione di fade-in
  const [fadeKey, setFadeKey] = useState(0);

  // Numero di prodotti visibili
  const visibleCount = {
    mobile: 1,
    tablet: 2,
    desktop: 4,
  };

  // Calcolo del numero di prodotti visibili in base alla larghezza dello schermo
  const getVisibleCount = () => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      if (width >= 1024) return visibleCount.desktop; // Desktop
      if (width >= 768) return visibleCount.tablet; // Tablet
      return visibleCount.mobile; // Mobile
    }
    return visibleCount.desktop; // Default
  };

  const handleNext = () => {
    setFadeKey((prev) => prev + 1); // Cambia chiave per triggerare l'animazione
    setStartIndex((prev) =>
      prev + getVisibleCount() >= novitaProducts.length
        ? 0
        : prev + getVisibleCount()
    );
  };

  const handlePrev = () => {
    setFadeKey((prev) => prev + 1); // Cambia chiave per triggerare l'animazione
    setStartIndex((prev) =>
      prev - getVisibleCount() < 0
        ? novitaProducts.length - getVisibleCount()
        : prev - getVisibleCount()
    );
  };

  const visibleProducts = novitaProducts.slice(
    startIndex,
    startIndex + getVisibleCount()
  );

  return (
    <div className="py-40 bg-white">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Novità
      </h2>
      <div className="relative">
        <div className="flex gap-4 justify-center items-center">
          <button
            onClick={handlePrev}
            className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full shadow"
          >
            ◀
          </button>
          <div
            key={fadeKey} // Triggera l'animazione di fade-in
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl animate-fade-in"
          >
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <button
            onClick={handleNext}
            className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full shadow"
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
};

export default NovitaCarousel;
