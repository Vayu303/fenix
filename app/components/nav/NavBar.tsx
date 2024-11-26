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
    <header
      className="
            
            sticky  
            top-0
            w-full
            bg-slate-50
            z-30
            shadow-sm
            
"
    >
      <Container>
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Logo"
                width={150}
                height={150}
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Placeholder per la ricerca */}

          <div className="hidden lg:flex flex-grow mx-8 max-w-md">
            <SearchBar products={products} />
            <button className="bg-red-800 text-white rounded-full ml-2 px-3.5 py-auto mr-10 hover:bg-red-700 transition">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>

          {/* Links Navbar */}
          <div className="hidden md:flex flex-grow justify-center items-center xl:space-x-10 lg:space-x-3 gap-3">
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
              <button className="bg-red-800 text-white px-4 py-2 rounded-md hover:bg-red-700 transition ">
                Catalogo
              </button>
            </Link>
          </div>

          {/* Icone Carrello e Login */}
          <div className="hidden md:flex items-center space-x-6 ml-10">
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
            className="md:hidden text-gray-700 focus:outline-none"
          >
            {isOpen ? "✖" : "☰"} {/* Icona menu hamburger */}
          </button>
        </div>

        {/* Menu a comparsa per Mobile */}
        <div
          className={`absolute right-0 top-16 bg-slate-100 shadow-md transition-transform transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden`}
        >
          <div className="flex flex-col p-4">
            <Link href="/chi-siamo" className="py-2">
              Chi Siamo
            </Link>
            <Link href="/contatti" className="py-2">
              Contatti
            </Link>
            <Link href="/blog" className="py-2">
              Blog
            </Link>
            <Link href="/catalogo">
              <button className=" py-2 hover:text-red-800 transition ">
                Catalogo
              </button>
            </Link>
            <div className="flex items-center space-x-4 mt-4">
              <CartIcon />
              <Link href="/userdashboard">
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-gray-700 cursor-pointer w-8 h-8"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Barra di ricerca su mobile sotto al logo */}
        <div className="lg:hidden flex w-full px-4 py-4 max-w-[1920px] mx-auto">
          <SearchBar products={products} />
          <button className="bg-red-800 text-white rounded-full px-3 ml-2 px-3 py-2 mr-auto hover:bg-red-700 transition">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
