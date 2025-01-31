import express from "express";
import {
  createUserController,
  getUserController,
  testController,
  testLabel,
  updateUserController,
} from "../controllers/userController";

const router = express.Router();

router.post("/users", createUserController);
router.get("/u/:id", getUserController);
router.put("/users/:id", updateUserController);

router.get("/test", testController);
router.post("/label", testLabel);

export default router;
