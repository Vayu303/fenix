"use client";

// Pagina di successo per Stripe
import { NextPage } from 'next';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircleIcon } from '@heroicons/react/solid';

const SuccessPage: NextPage = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams?.get('orderId') || 'Non disponibile';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-slate-900 to-slate-800">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-md text-center">
        <CheckCircleIcon className="h-16 w-16 text-green-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-green-700 mb-2">Pagamento Completato!</h1>
        <p className="text-gray-600 mb-6">
          Il pagamento per l'ordine <strong className="text-gray-800">{orderId}</strong> è stato completato con successo.
        </p>
        <p className="text-gray-500 mb-8">
          Ti invieremo una conferma via email con i dettagli dell'acquisto.
        </p>
        <Link href="/" className="inline-block px-8 py-3 bg-green-800 text-white font-medium rounded-lg hover:bg-green-900 transition">
          Torna alla Home
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
