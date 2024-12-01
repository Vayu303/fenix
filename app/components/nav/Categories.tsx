import Container from "../Container";
import Link from "next/link";

const Categories = () => {
  const categories = [
    {
      id: 1,
      name: "Arredamento",
      image: "/images/arredamento.jpg",
      slug: "arredamento",
    },
    {
      id: 2,
      name: "Mirabilia",
      image: "/images/mirabilia.jpg",
      slug: "mirabilia",
    },
    {
      id: 3,
      name: "Collezionismo",
      image: "/images/collezionismo.jpg",
      slug: "collezionismo",
    },
    {
      id: 4,
      name: "Abbigliamento",
      image: "/images/abbigliamento.jpg",
      slug: "abbigliamento",
    },
  ];

  return (
    <div className="py-16 bg-slate-100">
      <Container>
        <h2 className="text-3xl font-bold text-center mb-8">
          Esplora le Categorie
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 max-w-7xl mx-auto">
          {categories.map((category, index) => (
            <Link href={`/collection/${category.slug}`} key={category.slug}>
              <div key={index} className="relative group">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-60 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer">
                  <span className="text-white font-semibold text-xl">
                    {category.name}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Categories;
