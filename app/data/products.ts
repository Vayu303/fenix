// data/products.ts

export interface Product {
  id: number;
  title: string;
  image: string;
  additionalImages?: string[];
  price: number;
  description: string; // Opzionale, se vuoi aggiungere una descrizione
  category: string;
  stock: number; //
  novità: boolean;
  material: string;
  sizes: string;
  sku: string;
}

export type MinimalProduct = Pick<Product, "id" | "title">;

const products: Product[] = [
  {
    id: 1,
    title: "Mobile Vintage",
    image: "/images/mobile-vintage-1.jpg", // Assicurati che l'immagine esista
    additionalImages: [
      "/images/prodotto1_1.jpg",
      "/images/prodotto1_2.jpg",
      "/images/prodotto1_3.jpg",
    ],
    price: 150.0,
    description: "Un mobile vintage unico in stile retrò.",
    category: "arredamento",
    stock: 1,
    novità: true,
    material: "Legno di noce",
    sizes: "150x100x180",
    sku: "A0174",
  },
  {
    id: 2,
    title: "Lampada da Tavolo",
    image: "/images/lampada-da-tavolo-1.jpg",
    additionalImages: [
      "/images/prodotto1_1.jpg",
      "/images/prodotto1_2.jpg",
      "/images/prodotto1_3.jpg",
    ],
    price: 85.0,
    description: "Lampada da tavolo elegante per ogni ambiente.",
    category: "arredamento",
    stock: 1,
    novità: false,
    material: "Legno di noce",
    sizes: "150x100x180",
    sku: "A0174",
  },
  {
    id: 3,
    title: "Orologio Antico",
    image: "/images/orologio-antico.jpg",
    additionalImages: [
      "/images/prodotto1_1.jpg",
      "/images/prodotto1_2.jpg",
      "/images/prodotto1_3.jpg",
    ],
    price: 200.0,
    description: "Un orologio antico perfetto per i collezionisti.",
    category: "collezionismo",
    stock: 1,
    novità: true,
    material: "Legno di noce",
    sizes: "150x100x180",
    sku: "A0174",
  },
  {
    id: 4,
    title: "Vaso in Terracotta",
    image: "/images/vaso-terracotta.jpg",
    additionalImages: [
      "/images/prodotto1_1.jpg",
      "/images/prodotto1_2.jpg",
      "/images/prodotto1_3.jpg",
    ],
    price: 350.0,
    description: "Vaso della seconda metà del Settecento, origini sconosciute.",
    category: "mirabilia",
    stock: 1,
    novità: true,
    material: "Legno di noce",
    sizes: "150x100x180",
    sku: "A0174",
  },
  {
    id: 5,
    title: "Coppia di Poltrone",
    image: "/images/coppia-di-poltrone.jpg",
    additionalImages: [
      "/images/prodotto1_1.jpg",
      "/images/prodotto1_2.jpg",
      "/images/prodotto1_3.jpg",
    ],
    price: 350.0,
    description: "Comode poltrone in tessuto di alta qualità.",
    category: "arredamento",
    stock: 1,
    novità: true,
    material: "Legno di noce",
    sizes: "150x100x180",
    sku: "A0174",
  },
  {
    id: 6,
    title: "Lampadario Vintage",
    image: "/images/lampadario-vintage.jpg",
    additionalImages: [
      "/images/prodotto2_1.jpg",
      "/images/prodotto2_2.jpg",
      "/images/prodotto2_3.jpg",
    ],
    price: 150.0,
    description: "Lampadario classico in ottone, perfetto per ambienti retrò.",
    category: "mirabilia",
    stock: 1,
    novità: false,
    material: "Legno di noce",
    sizes: "150x100x180",
    sku: "A0174",
  },
  {
    id: 7,
    title: "Credenza Antica",
    image: "/images/credenza-antica.jpg",
    additionalImages: [
      "/images/prodotto3_1.jpg",
      "/images/prodotto3_2.jpg",
      "/images/prodotto3_3.jpg",
    ],
    price: 500.0,
    description: "Elegante credenza del XIX secolo in legno massello.",
    category: "arredamento",
    stock: 1,
    novità: true,
    material: "Legno di noce",
    sizes: "150x100x180",
    sku: "A0174",
  },
  {
    id: 8,
    title: "Orologio da Tavolo",
    image: "/images/orologio-tavolo.jpg",
    additionalImages: [
      "/images/prodotto4_1.jpg",
      "/images/prodotto4_2.jpg",
      "/images/prodotto4_3.jpg",
    ],
    price: 75.0,
    description: "Orologio vintage da tavolo con dettagli dorati.",
    category: "collezionismo",
    stock: 1,
    novità: false,
    material: "Legno di noce",
    sizes: "150x100x180",
    sku: "A0174",
  },
  {
    id: 9,
    title: "Divano Chesterfield",
    image: "/images/divano-chesterfield.jpg",
    additionalImages: [
      "/images/prodotto5_1.jpg",
      "/images/prodotto5_2.jpg",
      "/images/prodotto5_3.jpg",
    ],
    price: 600.0,
    description: "Divano Chesterfield in pelle originale, stile classico.",
    category: "arredamento",
    stock: 1,
    novità: true,
    material: "Legno di noce",
    sizes: "150x100x180",
    sku: "A0174",
  },
  {
    id: 10,
    title: "Specchio Barocco",
    image: "/images/specchio-barocco.jpg",
    additionalImages: [
      "/images/prodotto6_1.jpg",
      "/images/prodotto6_2.jpg",
      "/images/prodotto6_3.jpg",
    ],
    price: 200.0,
    description: "Specchio in stile barocco con cornice dorata.",
    category: "restaurati",
    stock: 1,
    novità: true,
    material: "Legno di noce",
    sizes: "150x100x180",
    sku: "A0174",
  },
  {
    id: 11,
    title: "Coppia di Lampade",
    image: "/images/specchio-barocco.jpg",
    additionalImages: [
      "/images/prodotto6_1.jpg",
      "/images/prodotto6_2.jpg",
      "/images/prodotto6_3.jpg",
    ],
    price: 200.0,
    description: "Specchio in stile barocco con cornice dorata.",
    category: "mirabilia",
    stock: 1,
    novità: true,
    material: "Legno di noce",
    sizes: "150x100x180",
    sku: "A0174",
  },
  {
    id: 12,
    title: "Sottobicchieri Coca Cola",
    image: "/images/sottobicchieri-cocacola.jpg",
    additionalImages: [
      "/images/prodotto6_1.jpg",
      "/images/prodotto6_2.jpg",
      "/images/prodotto6_3.jpg",
    ],
    price: 200.0,
    description: "Set da 6 pz ciascuno. Originali Coca Cola.",
    category: "collezionismo",
    stock: 1,
    novità: true,
    material: "Legno di noce",
    sizes: "150x100x180",
    sku: "A0174",
  },
];

export default products;
