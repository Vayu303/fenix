/** @type {import('next').NextConfig} */
import dotenv from "dotenv";
import path from "path"; // Importa il modulo 'path'
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "./backend/.env") });

const nextConfig = {
  webpack: (config) => {
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: "all", // Codice riutilizzabile è separato in file più piccoli
      },
    };
    config.cache = false;
    return config;
  },

  reactStrictMode: true, // Abilita il controllo rigoroso di React
  experimental: {
    optimizeCss: true, // Abilita l'ottimizzazione CSS
    scrollRestoration: true, // Ripristina la posizione dello scroll tra le pagine
  },
  env: {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    SESSION_SECRET: process.env.SESSION_SECRET,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000", // URL del backend
  },
  async rewrites() {
    return [
      {
        source: "/server-api/:path*", // Percorso lato client
        destination: `${process.env.NEXT_PUBLIC_API_URL}/server-api/:path*`, // Proxy al backend
      },
    ];
  },
};

export default nextConfig;
