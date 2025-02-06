import express from "express";
import {
  createUserController,
  getUserController,
  sendEmergencySms,
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
router.post("/send-emergency-sms", sendEmergencySms);

router.post("/create-checkout-session", paymentController);
router.get("/session-status", getPaymentSessionController);

export default router;
