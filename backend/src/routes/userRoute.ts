import express from "express";
import {
  createUserController,
  getUserController,
  updateUserController,
} from "../controllers/userController";

const router = express.Router();

router.post("/users", createUserController);
router.get("/u/:id", getUserController);
router.put("/users/:id", updateUserController);

export default router;
