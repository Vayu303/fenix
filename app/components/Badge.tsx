// components/Badge.tsx
import React from "react";
import { IconType } from "react-icons";

interface BadgeProps {
  icon: IconType; // Tipo per passare un'icona dinamica
  title: string;
  description: string;
}

const Badge: React.FC<BadgeProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center space-y-2 p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="text-red-800 text-4xl">
        <Icon />
      </div>
      <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default Badge;
