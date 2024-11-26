import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

library.add(faShoppingCart);

import { useCart } from "../context/CartProvider";
import Link from "next/link";

const CartIcon = () => {
  const { totalItems } = useCart();

  return (
    <Link href="/cart" className="relative">
      <FontAwesomeIcon icon={faShoppingCart} className="w-8 h-8" />
      {totalItems > 0 && (
        <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
