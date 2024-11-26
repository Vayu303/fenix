import express from "express";
import { verifyToken } from "../../middleware/authMiddleware";
import { createPreliminaryOrder } from "../../controllers/checkoutController";

const router = express.Router();

router.post(
  "/create-order",
  verifyToken,
  createPreliminaryOrder as express.RequestHandler
);

export default router;
