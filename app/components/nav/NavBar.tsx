"use client";

// components/Navbar.tsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faSearch } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Container from "../Container";
import SearchBar from "./SearchBar";
import products from "../../data/products";
import CartIcon from "../../CartIcon";

library.add(faUser, faSearch);

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="sticky top-0 w-full bg-slate-50 z-30 shadow-sm">
      <Container className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Logo"
                width={120}
                height={120}
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* SearchBar */}
          <div className="hidden lg:flex flex-grow ml-4 max-w-md">
            <SearchBar products={products} />
            <button className="bg-red-800 text-white rounded-full ml-2 px-3.5 py-2 hover:bg-red-700 transition">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>

          {/* Links Navbar */}
          <nav className="hidden md:flex flex-grow justify-center items-center gap-4 whitespace-nowrap overflow-hidden">
            <Link
              href="/chi-siamo"
              className="text-gray-700 hover:text-red-800"
            >
              Chi Siamo
            </Link>
            <Link href="/contatti" className="text-gray-700 hover:text-red-800">
              Contatti
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-red-800">
              Blog
            </Link>
            <Link href="/catalogo">
              <button className="bg-red-800 text-white px-4 py-2 rounded-md hover:bg-red-700 transition">
                Catalogo
              </button>
            </Link>
          </nav>

          {/* Icone Carrello e Login */}
          <div className="hidden md:flex items-center space-x-6">
            <CartIcon />
            <Link href="/userdashboard">
              <FontAwesomeIcon
                icon={faUser}
                className="text-gray-700 cursor-pointer w-8 h-8"
              />
            </Link>
          </div>

          {/* Hamburger Menu per Mobile */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-700 focus:outline-none text-2xl"
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Sidebar Mobile */}
<div
  className={`fixed inset-y-0 right-0 z-50 bg-slate-100 shadow-lg w-72 transform transition-transform duration-300 ${
    isOpen ? "translate-x-0" : "translate-x-full"
  }`}
>
  <div className="flex flex-col h-full">
    {/* Header della Sidebar */}
    <div className="flex justify-between items-center p-4 border-b">
      <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
      <button
        onClick={toggleMenu}
        className="text-gray-600 hover:text-gray-900 focus:outline-none"
      >
        ✖
      </button>
    </div>

    {/* Links nella Sidebar */}
    <div className="flex-grow p-4 space-y-6">
      <Link href="/chi-siamo" className="block text-gray-700 hover:text-red-800">
        Chi Siamo
      </Link>
      <Link href="/contatti" className="block text-gray-700 hover:text-red-800">
        Contatti
      </Link>
      <Link href="/blog" className="block text-gray-700 hover:text-red-800">
        Blog
      </Link>
      <Link href="/catalogo" className="block text-red-700 hover:text-red-800">
        Catalogo
      </Link>
      <div className="flex items-center space-x-4">
        <CartIcon />
        <Link href="/userdashboard">
          <FontAwesomeIcon
            icon={faUser}
            className="text-gray-700 cursor-pointer hover:text-red-700 w-8 h-8"
          />
        </Link>
      </div>
    </div>
  </div>
</div>

{/* Sfondo Semi-Trasparente */}
<div
  className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
  }`}
  onClick={toggleMenu}
/>


        {/* Barra di ricerca su mobile */}
        <div className="lg:hidden flex w-full mt-4 mb-4">
          <SearchBar products={products} />
          <button className="bg-red-800 text-white rounded-full px-3 ml-2 hover:bg-red-700 transition">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
