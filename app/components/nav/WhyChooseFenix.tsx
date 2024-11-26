"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaCheckCircle } from "react-icons/fa"; // Icona di esempio da FontAwesome

const WhyChooseFenix: React.FC = () => {
  const points = [
    "Qualità garantita: Ogni pezzo è autentico e restaurato con cura.",
    "Un design che ispira: Oggetti che raccontano una storia e si adattano ai contesti moderni.",
    "Supporto dedicato: Siamo qui per guidarti e rispondere a ogni tua domanda.",
    "Qualità garantita: Ogni pezzo è autentico e restaurato con cura.",
    "Passione per l’arte e l’eleganza senza tempo.",
  ];

  const [visiblePoints, setVisiblePoints] = useState<number>(0); // Numero di punti visibili
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let delay = 0;
          points.forEach((_, index) => {
            setTimeout(() => {
              setVisiblePoints((prev) => prev + 1); // Mostra i punti progressivamente
            }, delay);
            delay += 200; // Aggiunge un ritardo di 200ms per ogni punto
          });
        }
      },
      { threshold: 0.2 } // La sezione diventa attiva quando il 20% è visibile
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [points]);

  return (
    <section ref={sectionRef} className="why-choose-fenix py-40 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-red-800 mb-8">
          Perché scegliere Fenix?
        </h2>
        <ul className="max-w-2xl mx-auto space-y-6 text-left">
          {points.map((point, index) => (
            <li
              key={index}
              className={`flex items-center text-lg text-gray-700 transition-all duration-700 ease-out transform ${
                visiblePoints > index
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }} // Ritardo per il punto specifico
            >
              <FaCheckCircle className="text-red-800 w-6 h-6 mr-4 flex-shrink-0 leading-none" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WhyChooseFenix;
