import Container from "../Container";
import Link from "next/link";

const Banner = () => {
  return (
    <div className="bg-red-800 text-white py-16 text-center">
      <Container>
        <h1 className="text-4xl font-bold mb-4">
          Esplora la nostra collezione
        </h1>
        <p className="mb-6">Trova il pezzo che racconta la tua storia.</p>
        <Link href="/catalogo">
          <button className="bg-white text-red-800 font-semibold px-6 py-2 rounded-lg hover:bg-gray-200 transition hover:scale-105">
            Scopri ora
          </button>
        </Link>
      </Container>
    </div>
  );
};
export default Banner;
