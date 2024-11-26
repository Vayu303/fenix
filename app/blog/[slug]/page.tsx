// app/blog/[slug]/page.tsx
import React from "react";
import { notFound } from "next/navigation";

interface PostContent {
  title: string;
  date: string;
  content: string;
}

const postData: Record<string, PostContent> = {
  "fascino-antiquariato": {
    title: "Il fascino dell’antiquariato",
    date: "15 Ottobre 2024",
    content: `L'antiquariato ha una storia affascinante. Scopri come questi pezzi unici possono arricchire la tua casa e il tuo stile. Ogni pezzo racconta una storia e aggiunge carattere a qualsiasi ambiente.`,
  },
  "restaurare-mobili-epoca": {
    title: "Come restaurare mobili d’epoca",
    date: "8 Ottobre 2024",
    content: `Il restauro dei mobili d’epoca richiede abilità e passione. In questa guida, ti forniremo i passaggi essenziali per riportare alla vita i tuoi pezzi più cari.`,
  },
  "tendenze-design-interni-vintage": {
    title: "Le tendenze nel design d’interni vintage",
    date: "1 Ottobre 2024",
    content: `Il design d’interni vintage è tornato di moda. Scopri come incorporare elementi vintage nel tuo spazio per un look unico e affascinante.`,
  },
  "valutare-valore-antiquariato": {
    title: "Valutare il valore di un pezzo d’antiquariato",
    date: "25 Settembre 2024",
    content: `Quando si valuta un pezzo d’antiquariato, ci sono molti fattori da considerare. Esplora le linee guida per capire il vero valore dei tuoi beni.`,
  },
};

const Post = ({ params }: { params: { slug: string } }) => {
  const post = postData[params.slug];

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 text-sm mb-4">{post.date}</p>
      <div>{post.content}</div>
    </div>
  );
};

// Funzione per generare i parametri statici
export async function generateStaticParams() {
  return Object.keys(postData).map((slug) => ({
    slug,
  }));
}

export default Post;
