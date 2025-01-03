import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dbConnect from "../utils/dbConnect";
import { User } from "../models/user";

// Funzione per generare un token JWT
const TOKEN_EXPIRATION = "1h"; // Durata del token

const generateToken = (userId: string): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET non definito");
  }
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: TOKEN_EXPIRATION,
  });
};

// **Registrazione**
export const registerHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ message: "Tutti i campi sono obbligatori" });
      return;
    }

    console.log("[Register Handler] Registrazione iniziata con:", {
      name,
      email,
    });

    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({ message: "Utente già registrato" });
      return;
    }

    const newUser = new User({
      name,
      email,
      password, // Passa la password non hashata, sarà hashata nel pre-save hook
    });
    await newUser.save();

    console.log("Utente salvato nel database:", newUser);

    console.log("[Register Handler] Nuovo utente creato con ID:", newUser._id);

    const token = generateToken(newUser._id.toString());

    // Imposta il cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // True in produzione
      maxAge: 60 * 60 * 1000, // 1 ora
      sameSite: "strict",
    });

    res.status(201).json({
      message: "Registrazione completata con successo",
      token,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Errore durante la registrazione:", error);
    next(error);
  }
};

// **Login**
export const loginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Tutti i campi sono obbligatori" });
      return;
    }

    console.log("[Login Handler] Login iniziato per email:", email);

    await dbConnect();
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      console.log("[Login Handler] Utente non trovato per email:", email);
      res.status(404).json({ message: "Utente non trovato" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("[Login Handler] Password non valida per email:", email);
      res.status(401).json({ message: "Credenziali non valide" });
      return;
    }

    console.log("[Login Handler] Login riuscito per utente ID:", user._id);

    const token = generateToken(user._id.toString());

    // Imposta il cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Solo HTTPS in produzione
      maxAge: 60 * 60 * 1000, // 1 ora
      sameSite: "strict",
    });

    console.log("Cookie ricevuto nel middleware:", req.cookies.jwt);

    res.status(200).json({
      message: "Login riuscito",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Errore durante il login:", error);
    next(error);
  }
};

// **Logout**

export const logoutHandler = (_req: Request, res: Response) => {
  try {
    // Cancella il cookie JWT
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.status(200).json({ message: "Logout completato con successo" });
    return;
  } catch (err) {
    console.error("Errore durante il logout:", err);
    res.status(500).json({ message: "Errore del server durante il logout" });
    return;
  }
};
