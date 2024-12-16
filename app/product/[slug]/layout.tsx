import { Metadata } from "next";
import products from "../../data/products"; // Importa il tuo file statico

// Genera i parametri statici per le route dinamiche
export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

// Funzione per ottenere un prodotto statico
async function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

// Genera i metadati
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  // Attendi la risoluzione di `params`
  const resolvedParams = await params;

  console.log("Params ricevuti:", resolvedParams);

  const product = await getProductBySlug(resolvedParams.slug);

  if (!product) {
    return {
      title: "Prodotto non trovato | Fenix Antiquariato",
      description: "Il prodotto richiesto non è stato trovato.",
    };
  }

  return {
    title: `${product.title} | Fenix Antiquariato`,
    description: product.description,
    openGraph: {
      title: `${product.title} | Fenix Antiquariato`,
      description: product.description,
      images: [product.image],
      url: `https://www.tuosito.com/product/${product.slug}`,
    },
  };
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
