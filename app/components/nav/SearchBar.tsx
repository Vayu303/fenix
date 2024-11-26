// components/SearchBar.tsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import products from "../../data/products"; // Importa la lista dei prodotti

interface SearchBarProps {
  products: { id: number; title: string; image: string; price: number }[]; // Adatta questo tipo in base alla tua struttura
}

const SearchBar: React.FC<SearchBarProps> = () => {
  const [searchTerm, setSearchTerm] = useState<string>(""); // Testo di ricerca
  const [filteredProducts, setFilteredProducts] = useState<typeof products>([]); // Risultati filtrati
  const router = useRouter();

  // Funzione per gestire il cambio del testo di ricerca
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(query);

    // Filtra i prodotti che contengono il termine di ricerca
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  // Funzione per il click su un prodotto della lista
  const handleProductClick = (productId: number) => {
    setSearchTerm(""); // Resetta il campo di ricerca
    setFilteredProducts([]); // Nasconde i suggerimenti
    router.push(`/product/${productId}`); // Naviga alla pagina del prodotto
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Barra di ricerca */}
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Cerca prodotti..."
        className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-800"
      />

      {/* Lista di suggerimenti */}
      {searchTerm && filteredProducts.length > 0 && (
        <div className="absolute z-10 w-full bg-white shadow-lg border border-gray-300 rounded-lg mt-1 max-h-64 overflow-y-auto">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              className="p-2 border-b border-gray-100 cursor-pointer hover:bg-gray-100 flex items-center"
            >
              {/* Miniatura e nome del prodotto */}
              <img
                src={product.image}
                alt={product.title}
                className="w-12 h-12 mr-4 object-cover"
              />
              <span>{product.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
