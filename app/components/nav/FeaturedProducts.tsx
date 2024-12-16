import ProductCard from "../ProductCard";
import products from "../../data/products";
import React from "react";
import Container from "../Container";

const FeaturedProducts = () => {
  return (
    <section className="bg-gray-50 py-16">
      <Container>
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
          Prodotti in Evidenza
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedProducts;
