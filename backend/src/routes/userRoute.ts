import express from "express";
import {
  createUserController,
  getUserController,
  updateUserController,
} from "../controllers/userController";
import {
  getPaymentSessionController,
  paymentController,
} from "../controllers/paymentController";

const router = express.Router();

router.post("/users", createUserController);
router.get("/u/:id", getUserController);
router.put("/users/:id", updateUserController);

router.post("/create-checkout-session", paymentController);
router.get("/session-status", getPaymentSessionController);

export default router;
