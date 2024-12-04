import express from "express";
import { logoutHandler } from "../../controllers/authController";

const router = express.Router();

router.post("/", logoutHandler);

export default router;
