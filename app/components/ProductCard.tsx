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
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-transform duration-300 hover:scale-105">
      <Link
        href={`/product/${product.slug}`}
        className="block h-[250px] relative"
      >
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover"
        />
      </Link>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 text-center">
          {product.title}
        </h3>
        <p className="text-lg text-red-800 font-bold text-center mt-2">
          €{product.price.toFixed(2)}
        </p>
        <div className="flex justify-center mt-4">
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
