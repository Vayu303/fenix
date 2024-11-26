// app/cookie-policy/page.tsx

import React from "react";
import Container from "../components/Container";

const CookiePolicyPage = () => {
  return (
    <Container>
      <div className="container mx-auto px-60 py-20">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Politica sui Cookie
        </h1>
        <p className="text-gray-700 mb-4">
          Questo sito utilizza cookie per migliorare la tua esperienza di
          navigazione. I cookie sono piccoli file di testo memorizzati nel tuo
          dispositivo e possono essere usati per ricordare le tue preferenze o
          raccogliere dati anonimi sull'uso del sito. <br /> Ci teniamo a
          specificare che i dati non saranno mai passati a terze parti, accetto
          per le funzioni fondamentali e necessarie, come il pagamento.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
          Tipi di Cookie Utilizzati
        </h2>
        <ul className="list-disc ml-5 text-gray-700">
          <li>Cookie Necessari: Essenziali per il funzionamento del sito.</li>
          <li>
            Cookie di Performance: Utilizzati per raccogliere dati anonimi sulle
            prestazioni del sito.
          </li>
          <li>
            Cookie di Marketing: Utilizzati per tracciare le preferenze degli
            utenti e mostrare annunci rilevanti.
          </li>
        </ul>
        <p className="text-gray-700 mt-4">
          Per ulteriori informazioni su come utilizziamo i cookie, contattaci
          all'indirizzo email:{" "}
          <a href="mailto:info@example.com" className="underline">
            info@example.com
          </a>
          .
        </p>
      </div>
    </Container>
  );
};

export default CookiePolicyPage;
