// app/blog/page.tsx
import React from "react";
import Link from "next/link";
import Container from "../components/Container";

interface Post {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  slug: string;
}

const posts: Post[] = [
  {
    id: 1,
    title: "Il fascino dell’antiquariato",
    date: "15 Ottobre 2024",
    excerpt:
      "Scopri perché l’antiquariato continua ad affascinare generazioni di collezionisti...",
    slug: "fascino-antiquariato",
  },
  {
    id: 2,
    title: "Come restaurare mobili d’epoca",
    date: "8 Ottobre 2024",
    excerpt:
      "Guida passo passo su come riportare alla vita i mobili d’epoca...",
    slug: "restaurare-mobili-epoca",
  },
  {
    id: 3,
    title: "Le tendenze nel design d’interni vintage",
    date: "1 Ottobre 2024",
    excerpt:
      "Esplora le ultime tendenze nel design d’interni che incorporano elementi vintage...",
    slug: "tendenze-design-interni-vintage",
  },
  {
    id: 4,
    title: "Valutare il valore di un pezzo d’antiquariato",
    date: "25 Settembre 2024",
    excerpt:
      "Cosa considerare quando si valuta un pezzo d’antiquariato? Ecco alcuni consigli...",
    slug: "valutare-valore-antiquariato",
  },
];

const Blog = () => {
  return (
    <div className="container mx-auto p-6">
      <Container>
        <h1 className="text-3xl font-bold mb-6">Blog</h1>
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border p-4 rounded shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-2xl font-semibold">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-red-900 hover:underline"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-500 text-sm mb-2">{post.date}</p>
              <p>{post.excerpt}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Blog;
