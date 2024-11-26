import express from "express";
import { loginHandler } from "../../controllers/authController";

const router = express.Router();

// Rotta per il login
router.post("/", loginHandler);

export default router;
