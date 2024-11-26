const Newsletter = () => {
  return (
    <section className="bg-gray-50 py-40 text-center">
      <h2 className="text-2xl font-bold mb-4">
        Iscriviti alla nostra Newsletter
      </h2>
      <p className="mb-6 text-gray-700">
        Ricevi offerte esclusive e le ultime novità sui nostri prodotti.
      </p>
      <form className="flex justify-center">
        <input
          type="email"
          placeholder="Inserisci la tua email"
          className="px-4 py-2 w-80 rounded-l-lg border border-gray-300"
        />
        <button className="bg-red-800 text-white px-4 py-2 rounded-r-lg hover:bg-red-700 transition">
          Iscriviti
        </button>
      </form>
    </section>
  );
};

export default Newsletter;
