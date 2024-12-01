// components/ProductCard.tsx
import React from "react";
import AddToCartButton from "./nav/AddToCartButton";
import Link from "next/link";
import Image from "next/image";
import { Product } from "../data/products";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white p-4 rounded-lg border border-transparent flex flex-col transition duration-300 hover:border-red-800 h-[400px] md:h-[350px] lg:h-[450px]">
      <Link
        href={`/product/${product.slug}`}
        className="block border-b border-gray-200 overflow-hidden h-[200px] md:h-[180px] lg:h-[250px]"
      >
        <div className="w-full h-full relative">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain"
          />
        </div>
      </Link>
      <h3 className="text-lg font-medium mt-2 text-center">{product.title}</h3>
      <p className="text-red-800 font-semibold text-center">
        €{product.price.toFixed(2)}
      </p>
      <div className="flex justify-center mt-auto">
        <AddToCartButton product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
