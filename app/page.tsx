"use client";
import Banner from "./components/nav/Banner";
import Categories from "./components/nav/Categories";
import Newsletter from "./components/nav/Newsletter";
import Reviews from "./components/nav/Reviews";
import FeaturedProducts from "./components/nav/FeaturedProducts";
import React, { useEffect, useState } from "react";
import WhyChooseFenix from "./components/nav/WhyChooseFenix";
import Novità from "./components/NovitaCarousel";
import BadgesList from "./components/BadgeList";
import products from "./data/products";
import HomeDiscountBanner from "./components/nav/DiscountBanner";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Ritarda l'attivazione del fade-in per simulare il caricamento
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div
      className={`transition-opacity duration-1000 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <Banner />
      <Categories />
      <section className="py-12 bg-gray-50">
        <section className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Perché scegliere noi?
          </h2>
          <BadgesList />
        </section>
      </section>
      <FeaturedProducts />
      <WhyChooseFenix />
      <HomeDiscountBanner/>
      <Reviews />
      <Novità products={products} />
      <Newsletter />
    </div>
  );
}
