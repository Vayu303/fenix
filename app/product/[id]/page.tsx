// app/product/[id]/page.tsx
"use client";
import { useParams } from "next/navigation";
import products from "../../data/products";
import AddToCartButton from "../../components/nav/AddToCartButton";
import Image from "next/image";
import Container from "../../components/Container";
import BadgesList from "@/app/components/BadgeList";
import NovitaCarousel from "../../components/NovitaCarousel";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id || "0", 10);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="text-center py-20 text-gray-600">
        Prodotto non trovato
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <Container>
          {/* Breadcrumb */}
          <div className="mb-6 text-sm text-gray-600">
            <nav>
              <ul className="flex space-x-2">
                <li>
                  <a href="/" className="text-red-700 hover:underline">
                    Home
                  </a>
                </li>
                <li>/</li>
                <li>
                  <a href="/catalogo" className="text-red-700 hover:underline">
                    Catalogo
                  </a>
                </li>
                <li>/</li>
                <li>
                  <a
                    href={`/collection/${product.category}`}
                    className="text-red-700 hover:underline"
                  >
                    {product.category}
                  </a>
                </li>
                <li>/</li>
                <li className="text-gray-700">{product.title}</li>
              </ul>
            </nav>
          </div>

          {/* Main Product Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="space-y-6">
              <div className="relative w-full h-[600px]">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes={"400px 600px"}
                  className="object-contain rounded-lg shadow-lg"
                  priority
                />
              </div>
              <div className="flex space-x-4 overflow-x-auto">
                {product.additionalImages?.map((img, index) => (
                  <div key={index} className="relative w-[100px] h-[100px]">
                    <Image
                      src={img}
                      alt={`${product.title} image ${index + 1}`}
                      fill
                      sizes={"100px 100px"}
                      className="object-cover rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-gray-800">
                {product.title}
              </h1>
              <p className="text-2xl text-red-800 font-bold">
                €{product.price}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>

              {/* Availability */}
              <p
                className={`text-sm ${
                  product.stock > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.stock > 0
                  ? `Disponibilità: ${product.stock}`
                  : "Non disponibile"}
              </p>

              {/* Add to Cart */}
              <div className="flex justify-start">
                <AddToCartButton product={product} />
              </div>

              {/* Tabs for Details */}
              <div className="mt-8">
                <ul className="flex border-b">
                  <li className="mr-6">
                    <a
                      href="#details"
                      className="text-gray-800 hover:text-red-800 font-medium"
                    >
                      Dettagli
                    </a>
                  </li>
                  <li className="mr-6">
                    <a
                      href="#reviews"
                      className="text-gray-800 hover:text-red-800 font-medium"
                    >
                      Recensioni
                    </a>
                  </li>
                </ul>
                <div className="mt-4" id="details">
                  <h2 className="text-xl font-semibold mb-2">
                    Specifiche Tecniche
                  </h2>
                  <ul className="list-disc list-inside text-gray-700">
                    <li>Materiale: {product.material}</li>
                    <li>Dimensioni: {product.sizes}</li>
                    <li>Codice Prodotto: {product.sku}</li>
                  </ul>
                </div>
                <div className="mt-8" id="reviews">
                  <h2 className="text-xl font-semibold mb-2">Recensioni</h2>
                  {/* Simula recensioni */}
                  {product.reviews?.length > 0 ? (
                    product.reviews.map((review, index) => (
                      <div key={index} className="border-b py-4">
                        <p className="font-semibold text-gray-800">
                          {review.user}
                        </p>
                        <p className="text-sm text-gray-600">
                          {review.comment}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">
                      Nessuna recensione disponibile.
                    </p>
                  )}
                </div>
                <div className="mt-12">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    I nostri valori
                  </h2>
                  <BadgesList />
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Products */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Prodotti Correlati
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {products.slice(0, 4).map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="relative w-full h-[200px]"
                >
                  <Image
                    src={relatedProduct.image}
                    alt={relatedProduct.title}
                    fill
                    sizes={"200px"}
                    className="object-cover rounded-lg shadow-md"
                  />
                  <p className="mt-2 text-sm text-gray-800">
                    {relatedProduct.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
      <NovitaCarousel products={products} />
    </>
  );
};

export default ProductPage;
