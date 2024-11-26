// pages/catalogo.tsx
"use client";
import React, { useState } from "react";

import products from "../data/products";
import ProductCard from "../components/ProductCard";

const Catalogo = () => {
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
          <option value="restauri">Restaurato</option>
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
  );
};

export default Catalogo;
