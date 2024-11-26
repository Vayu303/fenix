// app/[collection]/page.tsx
"use client";

import React from "react";
import { useParams } from "next/navigation";
import products from "../../data/products";
import ProductCard from "../../components/ProductCard";

const CollectionPage: React.FC = () => {
  const params = useParams();
  const collection = params.collection;

  // Filtro dei prodotti in base alla categoria
  const filteredProducts = products.filter(
    (product) => product.category === collection
  );

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8 capitalize">
        {collection}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-center text-gray-600 flex justify-center">
            Spiacente, al momento non abbiamo nessun prodotto in questa
            collezione.
          </p>
        )}
      </div>
    </div>
  );
};

export default CollectionPage;
