import { Metadata } from "next";
import products from "../../data/products"; // Importa i dati dei prodotti

// Funzione per trovare un prodotto basato sullo slug
async function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

// Genera i metadati per la pagina del prodotto
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);

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
