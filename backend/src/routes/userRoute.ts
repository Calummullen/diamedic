import express from "express";
import {
  createUserController,
  getUserController,
  testController,
  testLabel,
  updateUserController,
} from "../controllers/userController";
import {
  getPaymentSessionController,
  paymentController,
  paymentWebhookController,
} from "../controllers/paymentController";

const router = express.Router();

router.post("/users", createUserController);
router.get("/u/:id", getUserController);
router.put("/users/:id", updateUserController);

router.get("/test", testController);
router.post("/label", testLabel);

router.post("/create-checkout-session", paymentController);
router.get("/session-status", getPaymentSessionController);
router.post(
  "/payment-webhook",
  express.raw({ type: "application/json" }),
  paymentWebhookController
);

export default router;
