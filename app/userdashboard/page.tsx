"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useCart } from "../../context/CartProvider";
import Container from "../components/Container";
import CheckoutButton from "../components/CheckoutButton";
import axios from "@/backend/server-api/utils/axiosConfig";

axios.defaults.baseURL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

type UserData = {
  name: string;
  email: string;
  _id: string; // Campo ID generato automaticamente
};

const UserDashboard = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [section, setSection] = useState<"profile" | "orders" | "cart">(
    "profile"
  );

  const { cartItems, totalItems, clearCart } = useCart(); // Usa l'hook `useCart`

  axios.defaults.baseURL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const fetchUserData = async () => {
    setLoading(true); // Imposta loading a true all'inizio della richiesta
    const token = localStorage.getItem("token");

    if (!token) {
      //console.error("Token non presente. Utente non autenticato.");
      setUserData(null); // Resetta i dati utente se non c'è un token
      setLoading(false); // Imposta loading a false
      return;
    }

    try {
      const response = await axios.get("/server-api/profile", {
        headers: { Authorization: `Bearer ${token}` }, // Includi il token JWT
      });

      setUserData(response.data); // Memorizza i dati utente recuperati
      console.log("Dati utente recuperati:", response.data);
    } catch (err) {
      setUserData(null); // Resetta i dati utente in caso di errore

      if (axios.isAxiosError(err)) {
        console.error(
          "Errore recupero dati, oppure token scaduto",
          err.response?.data || err.message
        );
      } else {
        console.error("Errore sconosciuto nel recupero dei dati utente:", err);
      }
    } finally {
      setLoading(false); // Imposta loading a false alla fine della richiesta
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "email" ? value.toLowerCase() : value,
    });
  };

  const handleRegister = async () => {
    try {
      setError(null);
      await axios.post("/server-api/register", form);
      alert("Registration successful! Please login.");
      setIsRegistering(false);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error during registration:", err.message);
        setError("Registration failed");
      } else {
        console.error("Errore sconosciuto durante la registrazione:", err);
        setError("Errore sconosciuto durante la registrazione");
      }
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("/server-api/login", {
        email: form.email,
        password: form.password,
      });

      const { token, user } = response.data;

      if (!token || !user?._id) {
        throw new Error("Dati mancanti nella risposta del server.");
      }

      // Salva token e userId nel localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userId", user._id);
      console.log("Token salvato:", token);
      console.log("User ID salvato:", user._id);

      // Aggiorna lo stato utente
      await fetchUserData();

      router.push("/userdashboard"); // Reindirizza alla dashboard
    } catch (err) {
      if (err instanceof Error) {
        console.error("Errore nel login:", err.message);
        setError("Login failed. Please check your credentials.");
      } else {
        console.error("Errore sconosciuto nel login:", err);
        setError("Errore sconosciuto durante il login.");
      }
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/server-api/logout", {}, { withCredentials: true });
      // Rimuovi i dati salvati localmente
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      setUserData(null); // Resetta i dati utente
      router.push("/"); // Reindirizza alla HOMEPAGE, eventualmente cambiare per reindirizzare al LOGIN
    } catch (err) {
      console.error("Errore durante il logout:", err);
    }
  };

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  if (loading)
    return (
      <Container>
        <div className="flex flex-col items-center py-40 space-y-6 text-center">
          Caricamento...
        </div>
      </Container>
    );

  return (
    <div className="p-6 max-w-100 mx-auto bg-white rounded-lg">
      <Container>
        {userData ? (
          <div className="flex flex-col md:flex-row">
            <aside className="w-full h-100 md:h-svh md:w-1/4 bg-gray-800 text-white p-6 mr-12 ">
              <h2 className="text-xl font-semibold mb-6">Dashboard utente</h2>
              <nav className="flex flex-col space-y-4">
                <button
                  onClick={() => setSection("profile")}
                  className="text-left text-sm hover:text-yellow-400"
                >
                  Profilo utente
                </button>
                <button
                  onClick={() => setSection("orders")}
                  className="text-left text-sm hover:text-yellow-400"
                >
                  Storico ordini
                </button>
                <button
                  onClick={() => setSection("cart")}
                  className="text-left text-sm hover:text-yellow-400"
                >
                  Visualizza carrello
                </button>
                <button
                  onClick={handleLogout}
                  className="text-left text-sm text-red-500 hover:text-red-700 mt-6"
                >
                  Logout
                </button>
              </nav>
            </aside>

            <main className="flex-1 p-6">
              {section === "profile" && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Profilo</h2>
                  <p>
                    <strong>Name:</strong> {userData.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {userData.email}
                  </p>
                </div>
              )}
              {section === "orders" && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Storico ordini</h2>
                  <p>Il tuo storico ordini verrà visualizzato quì.</p>
                </div>
              )}
              {section === "cart" && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Carrello</h2>
                  {cartItems.length > 0 ? (
                    <ul className="space-y-4">
                      {cartItems.map((item) => (
                        <li
                          key={item.id}
                          className="p-4 bg-white rounded shadow flex justify-between items-center"
                        >
                          <div>
                            <p className="font-semibold">{item.title}</p>

                            <p>{item.description}</p>
                          </div>
                          <div className="text-lg font-bold">
                            Totale: €{item.price.toFixed(2)}
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>Il tuo carrello è vuoto.</p>
                  )}
                  <div className="flex-col mt-6 lg:flex md:flex-row justify-between lg:items-center">
                    <h3 className="text-xl font-semibold mt-5">
                      Totale ({totalItems} prodotti): €{total.toFixed(2)}
                    </h3>
                    <div className="flex justify-between gap-2 items-center">
                      <button
                        onClick={clearCart}
                        className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800"
                      >
                        Svuota Carrello
                      </button>
                      <CheckoutButton />
                    </div>
                  </div>
                </div>
              )}
            </main>
          </div>
        ) : (
          <div
            className="pt-0 pb-10 px-6 sm:pt-32 sm:pb-16"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault(); // Previeni il comportamento predefinito
                handleLogin();
              }
            }}
          >
            <div className="mx-auto w-full max-w-md sm:max-w-lg bg-white shadow-lg rounded-lg py-12 px-6 sm:py-16 sm:px-12">
              <h2 className="text-xl font-bold mb-4">
                {isRegistering ? "Registrazione" : "Login"}
              </h2>
              {error && <p className="text-red-700">{error}</p>}
              {isRegistering && (
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full p-2 mb-2 border rounded"
                />
              )}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-2 mb-2 border rounded"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full p-2 mb-4 border rounded"
              />
              {isRegistering ? (
                <button
                  onClick={handleRegister}
                  className="w-full bg-red-800 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Registrati
                </button>
              ) : (
                <button
                  onClick={handleLogin}
                  className="w-full bg-red-800 text-white px-4 py-2 rounded"
                  disabled={loading}
                >
                  Login
                </button>
              )}
              <button
                onClick={() => setIsRegistering(!isRegistering)}
                className="mt-4 text-sm text-red-700 underline"
              >
                {isRegistering
                  ? "Hai già un account? Login"
                  : "Non hai un account? Registrati"}
              </button>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default UserDashboard;
