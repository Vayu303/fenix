import passport from "passport";
import { User } from "../models/user.js"; // Verifica il percorso corretto del modello User

// Serializzazione dell'utente per la sessione
passport.serializeUser((user: any, done) => {
  done(null, user._id); // Usa _id generato da Mongoose
});

// Deserializzazione dell'utente dalla sessione
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return done(new Error("Utente non trovato"), null);
    }
    return done(null, user);
  } catch (error) {
    console.error("Errore nella deserializzazione:", error);
    return done(error, null);
  }
});

export default passport;
