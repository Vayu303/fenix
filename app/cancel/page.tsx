"use client";

// Pagina di annullamento per Stripe
import { NextPage } from 'next';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ExclamationCircleIcon } from '@heroicons/react/solid';

const CancelPage: NextPage = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams?.get('orderId') || 'Non disponibile';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-slate-900 to-slate-800">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-md text-center">
        <ExclamationCircleIcon className="h-16 w-16 text-red-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-red-700 mb-2">Pagamento Annullato</h1>
        <p className="text-gray-600 mb-6">
          Il pagamento per l'ordine <strong className="text-gray-800">{orderId}</strong> è stato annullato.
        </p>
        <p className="text-gray-500 mb-8">
          Se hai domande o hai bisogno di assistenza, contattaci.
        </p>
        <Link href="/" className="inline-block px-8 py-3 bg-red-800 text-white font-medium rounded-lg hover:bg-red-900 transition">
          Torna alla Home
        </Link>
      </div>
    </div>
  );
};

export default CancelPage;
