// pages/catalogo.tsx
"use client";
import React, { useEffect, useState } from "react";

import products from "../data/products";
import ProductCard from "../components/ProductCard";

const Catalogo = () => {
  // Aggiorna manualmente i meta tag e il titolo
  useEffect(() => {
    document.title = "Catalogo Prodotti | Fenix Antiquariato";

    const metaDescription = document.querySelector("meta[name='description']");
    const metaKeywords = document.querySelector("meta[name='keywords']");
    const ogTitle = document.querySelector("meta[property='og:title']");
    const ogDescription = document.querySelector(
      "meta[property='og:description']"
    );
    const ogImage = document.querySelector("meta[property='og:image']");
    const ogUrl = document.querySelector("meta[property='og:url']");

    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Esplora il nostro catalogo completo di prodotti di antiquariato, mobili vintage e pezzi unici. Trova il tuo tesoro nel nostro negozio."
      );
    }
    if (metaKeywords) {
      metaKeywords.setAttribute(
        "content",
        "catalogo antiquariato, mobili vintage, pezzi unici, antiquariato"
      );
    }
    if (ogTitle) {
      ogTitle.setAttribute("content", "Catalogo Prodotti | Fenix Antiquariato");
    }
    if (ogDescription) {
      ogDescription.setAttribute(
        "content",
        "Esplora il nostro catalogo completo di prodotti di antiquariato, mobili vintage e pezzi unici. Trova il tuo tesoro nel nostro negozio."
      );
    }
    if (ogImage) {
      ogImage.setAttribute(
        "content",
        "https://www.tuosito.com/path/to/catalog-image.jpg"
      );
    }
    if (ogUrl) {
      ogUrl.setAttribute("content", "https://www.tuosito.com/catalogo");
    }
  }, []); // Esegui solo al primo montaggio

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [date, setDate] = useState("");

  // Filtrare i prodotti in base ai criteri selezionati
  const filteredProducts = products.filter((product) => {
    const matchesName = product.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory = category ? product.category === category : true;
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
    //const matchesDate = date ? product.date === date : true;

    return matchesName && matchesCategory && matchesPrice; //&& matchesDate;
  });

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Catalogo Prodotti
        </h1>

        {/* Barra di Filtri */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* Filtro per Nome */}
          <input
            type="text"
            placeholder="Cerca per nome..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border rounded-lg"
          />

          {/* Filtro per Categoria */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border rounded-lg"
          >
            <option value="">Tutte le categorie</option>
            <option value="arredamento">Arredamento</option>
            <option value="collezionismo">Collezionismo</option>
            <option value="mirabilia">Mirabilia</option>
            <option value="abbigliamento">Abbigliamento</option>
          </select>

          {/* Filtro per Prezzo */}
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Prezzo Min"
              value={minPrice === 0 ? "" : minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="p-2 border rounded-lg w-1/2"
            />
            <input
              type="number"
              placeholder="Prezzo Max"
              value={maxPrice === Infinity ? "" : maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value) || Infinity)}
              className="p-2 border rounded-lg w-1/2"
            />
          </div>

          {/* Filtro per Data */}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-2 border rounded-lg"
          />
        </div>

        {/* Griglia dei Prodotti */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Catalogo;
