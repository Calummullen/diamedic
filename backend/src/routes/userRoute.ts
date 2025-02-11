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
import {
  getOrdersController,
  updateOrderStatusController,
} from "../controllers/orderController";

const router = express.Router();

router.post("/users", createUserController);
router.get("/u/:id", getUserController);
router.put("/users/:id", updateUserController);
router.post("/send-emergency-sms", sendEmergencySms);

router.post("/create-checkout-session", paymentController);
router.get("/session-status", getPaymentSessionController);

// router.get("/get-orders", getOrdersController);
// router.patch("/update-order-status", updateOrderStatusController);

export default router;
