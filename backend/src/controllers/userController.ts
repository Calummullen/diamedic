import { Request, Response } from "express";
import { ProfileData, profileSchema } from "../types/profile-schema";
import {
  createUserProfile,
  getUserProfile,
  updateUserProfile,
} from "../services/userService";
import { sendSms } from "../services/smsService";
import { getAddressFromCoordinates } from "../services/locationService";
import uuid4 from "uuid4";
import * as Sentry from "@sentry/node";

export const createUserController = async (req: Request, res: Response) => {
  const result = profileSchema.safeParse(req.body);
  const userId = uuid4();

  if (!result.success) {
    return res.status(400).json({ errors: result.error.format() });
  }

  try {
    await createUserProfile(result.data, userId);
    return res
      .status(201)
      .json({ message: "User created successfully.", userId });
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).json({ error: "Failed to create profile" });
  }
};

const formatPossessive = (name: string) => {
  // Check if the name ends with "s" or "S"
  if (name.endsWith("s") || name.endsWith("S")) {
    return `${name}'`;
  } else {
    return `${name}'s`;
  }
};

export const sendEmergencySms = async (req: Request, res: Response) => {
  const { id, latitude, longitude } = req.body;

  try {
    const profile: ProfileData = await getUserProfile(id);
    const addressData = await getAddressFromCoordinates(latitude, longitude);
    const currentTime = new Date().toLocaleTimeString();

    const message = `🚨 Diamedic Alert 🚨

${formatPossessive(profile.name)} QR code has been scanned.

${addressData?.address ? `Approximate location: ${addressData.address}` : ""}
Time: ${currentTime}
`;

    profile.emergencyContacts.forEach(async ({ phone, notifySMS }) => {
      try {
        if (notifySMS) {
          await sendSms(phone, message);
          console.log(`SMS sent to ${phone}`);
        }
      } catch (error) {
        Sentry.withScope((scope) => {
          scope.setContext("SMS Service: Failed to send SMS", { phone });
          Sentry.captureException(error);
        });
      }
    });
  } catch (error) {
    Sentry.captureException(error);
  }
};

export const getUserController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const profile: ProfileData = await getUserProfile(id);

    res.json(profile);
  } catch (error) {
    Sentry.captureException(error);
    res.status(404).json({ error: (error as Error).message });
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
    Sentry.captureException(error);
    res.status(500).json({ error: "Failed to update profile" });
  }
};
