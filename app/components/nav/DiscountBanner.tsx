"use client";

import { NextPage } from 'next';
import Link from 'next/link';
import { FaGift, FaTags, FaTruck } from 'react-icons/fa';

const HomeDiscountBanner: NextPage = () => {
  return (
    <section className="bg-gradient-to-r from-yellow-100 to-yellow-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <h2 className="text-4xl font-extrabold text-yellow-800 mb-4">
          Offerte Imperdibili su Articoli Selezionati
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Scopri i migliori sconti su antiquariato, vestiti vintage, e oggetti da collezione.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <div className="flex flex-col items-center bg-white shadow-lg p-6 rounded-lg w-48">
            <FaGift className="h-12 w-12 text-yellow-700 mb-4" />
            <h3 className="font-semibold text-lg text-gray-800">Regali Esclusivi</h3>
            <p className="text-sm text-gray-500 mt-2">Trova articoli perfetti per ogni occasione.</p>
          </div>
          <div className="flex flex-col items-center bg-white shadow-lg p-6 rounded-lg w-48">
            <FaTags className="h-12 w-12 text-yellow-700 mb-4" />
            <h3 className="font-semibold text-lg text-gray-800">Sconti fino al 50%</h3>
            <p className="text-sm text-gray-500 mt-2">Approfitta delle offerte limitate nel tempo.</p>
          </div>
          <div className="flex flex-col items-center bg-white shadow-lg p-6 rounded-lg w-48">
            <FaTruck className="h-12 w-12 text-yellow-700 mb-4" />
            <h3 className="font-semibold text-lg text-gray-800">Spedizione Gratuita</h3>
            <p className="text-sm text-gray-500 mt-2">Su tutti gli ordini sopra i 90€.</p>
          </div>
        </div>
        <Link
          href="/discounts"
          className="inline-block px-8 py-3 bg-yellow-700 text-white font-semibold text-lg rounded-lg hover:bg-yellow-800 transition"
        >
          Vai alle Offerte
        </Link>
      </div>
    </section>
  );
};

export default HomeDiscountBanner;
