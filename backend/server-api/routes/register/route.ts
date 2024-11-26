import express from "express";
import { registerHandler } from "../../controllers/authController";

const router = express.Router();

// Rotta per la registrazione
router.post("/", registerHandler);

export default router;
