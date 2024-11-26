// app/about/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const ChiSiamo = () => {
  const galleryImages = [
    "/gallery1.jpg", // Sostituisci con i tuoi percorsi immagini
    "/gallery2.jpg",
    "/gallery3.jpg",
    "/gallery4.jpg",
    "/gallery5.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    );
  };

  // Autoplay Functionality
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        handleNext();
      }, 3000); // Cambia immagine ogni 3 secondi
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  return (
    <div className="relative bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-t from-red-800 to-red-900 py-40">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Chi Siamo
          </h1>
          <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto">
            Scopri la nostra passione per l'antiquariato e il nostro impegno nel
            portare il fascino del passato nelle tue case.
          </p>
        </div>
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/antique-pattern.jpg" // Sostituisci con un'immagine decorativa
            alt="Antique Pattern"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </section>

      {/* Main Content 1 */}
      <section className="container mx-auto px-4 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Testo */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Benvenuti da Fenix
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Da anni, selezioniamo con cura e passione i migliori prodotti di
              antiquariato disponibili sul mercato. La nostra missione è quella
              di offrirti pezzi unici e autentici che raccontano storie
              affascinanti e portano con sé il fascino del passato.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Ci piace pensare a ogni oggetto come a una fenice: rinasce dalle
              sue ceneri, trasformato e pronto a vivere una nuova vita.
              Restauriamo con cura i pezzi che ne hanno bisogno, mantenendo
              intatti il loro carattere e la loro autenticità, per poi offrirli
              a chi desidera arricchire i propri spazi con oggetti unici,
              intrisi di storia e stile. Cosa Facciamo
            </p>
            <p className="text-gray-700 leading-relaxed">
              La nostra passione per l'antiquariato si riflette in ogni articolo
              che offriamo, garantendo che ogni acquisto rappresenti un
              investimento nel tempo e nella storia.
            </p>
          </div>

          {/* Immagine */}
          <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg border border-red-200">
            <Image
              src="/antique-showroom.jpg" // Sostituisci con un'immagine del tuo showroom
              alt="Showroom Fenix"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </section>

      {/* Main Content 2 */}
      <section className="container mx-auto px-4 pt-10 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Immagine */}
          <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg border border-red-200">
            <Image
              src="/antique-showroom.jpg" // Sostituisci con un'immagine del tuo showroom
              alt="Showroom Fenix"
              layout="fill"
              objectFit="cover"
            />
          </div>

          {/* Testo */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Cosa facciamo
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Esploriamo, scopriamo e valorizziamo. Il nostro lavoro è un mix
              tra caccia al tesoro e artigianato: setacciamo mercatini,
              collezioni private e negozi specializzati per trovare oggetti che
              parlano di un’epoca, di una tradizione, di un tempo lontano.
              Quando necessario, li affidiamo alle mani esperte dei nostri
              restauratori, che li riportano al loro splendore originario con un
              tocco contemporaneo.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Crediamo che il passato abbia ancora tanto da raccontare e che
              ogni oggetto possa diventare una parte viva del presente. Che tu
              stia cercando un pezzo unico per la tua casa o un regalo speciale
              per un appassionato, da Fenix troverai non solo un oggetto, ma una
              storia che aspetta di essere continuata.
            </p>
          </div>
        </div>
      </section>

      {/* Decorative Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-red-800 mb-6">
            Perché scegliere Fenix?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-white shadow-lg rounded-lg border border-red-200">
              <div className="text-red-800 text-4xl mb-4">
                <i className="fas fa-gem"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">Pezzi Unici</h3>
              <p className="text-gray-600">
                Ogni articolo è selezionato per la sua qualità e bellezza.
              </p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg border border-red-200">
              <div className="text-red-800 text-4xl mb-4">
                <i className="fas fa-paint-brush"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">Restauro Esperto</h3>
              <p className="text-gray-600">
                Restituiamo ai nostri prodotti la loro antica gloria.
              </p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg border border-red-200">
              <div className="text-red-800 text-4xl mb-4">
                <i className="fas fa-history"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Fascino del Passato
              </h3>
              <p className="text-gray-600">
                Ogni oggetto racconta una storia unica e affascinante.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-left">
          <h2 className="text-3xl font-bold text-red-800 mb-8">Galleria</h2>
          <div className="relative">
            {/* Carousel Image */}
            <div
              className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg border border-red-200"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Image
                src={galleryImages[currentIndex]}
                alt={`Gallery Image ${currentIndex + 1}`}
                layout="fill"
                objectFit="cover"
                className="transition-opacity duration-500 ease-in-out"
              />
            </div>

            {/* Navigation Buttons */}
            <div className="absolute inset-y-0 left-0 flex items-center">
              <button
                onClick={handlePrev}
                className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full shadow"
              >
                ◀
              </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button
                onClick={handleNext}
                className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full shadow"
              >
                ▶
              </button>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {galleryImages.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full cursor-pointer carousel-indicator ${
                    currentIndex === index
                      ? "bg-red-800"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChiSiamo;
