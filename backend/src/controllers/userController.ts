import { Request, Response } from "express";
import { profileSchema } from "../types/profile-schema";
import {
  createUserProfile,
  getUserProfile,
  updateUserProfile,
} from "../services/userService";

export const createUserController = async (req: Request, res: Response) => {
  const result = profileSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ errors: result.error.format() });
  }

  try {
    const { qrCode } = await createUserProfile(result.data);
    res.json({ qrCode });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create profile" });
  }
};

export const getUserController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const profile = await getUserProfile(id);
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: (error as any).message });
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = profileSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ errors: result.error.format() });
  }

  try {
    await updateUserProfile(id, result.data);
    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update profile" });
  }
};
