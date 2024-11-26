import express from "express";
import { verifyToken } from "../../middleware/authMiddleware";
import { getUserProfile } from "../../controllers/userController";

const router = express.Router();

// Rimuovi il prefisso duplicato "/profile"
router.get("/", verifyToken, getUserProfile);

export default router;
