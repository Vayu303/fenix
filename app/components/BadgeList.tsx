// components/BadgesList.tsx
import React from "react";
import { FaLeaf, FaCheckCircle, FaRecycle } from "react-icons/fa";
import Badge from "./Badge";

const BadgesList: React.FC = () => {
  const badges = [
    {
      icon: FaCheckCircle,
      title: "Qualità Garantita",
      description: "Solo prodotti autentici e certificati.",
    },
    {
      icon: FaLeaf,
      title: "Sostenibilità",
      description: "Materiali eco-compatibili e rispettosi dell'ambiente.",
    },
    {
      icon: FaRecycle,
      title: "Riciclo",
      description: "Promuoviamo il riuso per un futuro migliore.",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {badges.map((badge, index) => (
        <Badge
          key={index}
          icon={badge.icon}
          title={badge.title}
          description={badge.description}
        />
      ))}
    </div>
  );
};

export default BadgesList;
