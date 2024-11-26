// components/FeaturedProducts.tsx
import ProductCard from "../ProductCard";
import products from "../../data/products";
import React from "react";
import Container from "../Container";

const FeaturedProducts = () => {
  return (
    <section className="bg-white py-20 px-0 mx-0">
      <Container>
        <h2 className="text-3xl font-bold text-center mb-8">
          Prodotti in Evidenza
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 px-4 max-w-100 mx-auto">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedProducts;
