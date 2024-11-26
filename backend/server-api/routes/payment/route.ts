import express from "express";
import { verifyToken } from "../../middleware/authMiddleware";
import { createCheckoutSession } from "../../controllers/paymentController";

const router = express.Router();

// Rotta per creare una sessione di pagamento
router.post("/create-checkout-session", verifyToken, createCheckoutSession);

export default router;
