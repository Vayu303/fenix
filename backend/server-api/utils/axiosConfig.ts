// axiosConfig.ts
import axios from "axios";

// Configura l'URL base e le credenziali
axios.defaults.baseURL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
axios.defaults.withCredentials = true; // Per inviare cookie

export default axios;
