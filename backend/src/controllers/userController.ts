import { Request, Response } from "express";
import { ProfileData, profileSchema } from "../types/profile-schema";
import {
  createUserProfile,
  getUserProfile,
  updateUserProfile,
} from "../services/userService";
import { sendSms } from "../services/smsService";
import { sendOrderConfirmationEmail } from "../services/emailService";
import { getAddressFromCoordinates } from "../services/locationService";

export const createUserController = async (req: Request, res: Response) => {
  const result = profileSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ errors: result.error.format() });
  }

  try {
    const { userId, qrCode } = await createUserProfile(result.data);
    try {
      await sendOrderConfirmationEmail(result.data.email, userId);
    } catch (error: any) {
      console.error("Failed to send order confirmation email:", error.message);
    }
    res.json({ qrCode }).status(201);
  } catch (error) {
    console.error(error);
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

export const getUserController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const profile: ProfileData = await getUserProfile(id);
    const addressData = await getAddressFromCoordinates(51.3341366, -2.9787137);
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
        console.error(`Failed to send SMS to ${phone}:`, error);
      }
    });

    res.json(profile);
  } catch (error) {
    console.error(error);
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
    console.error(error);
    res.status(500).json({ error: "Failed to update profile" });
  }
};

export const testController = async (req: Request, res: Response) => {
  try {
    const data = await getAddressFromCoordinates(51.3341366, -2.9787137);
    const now = new Date();
    const currentTime = now.toLocaleTimeString(); // Localized time string

    const message = `🚨 Diamedic Alert 🚨

Calum's QR code has been scanned.

${data?.address ? `Approximate location: ${data.address}` : ""}
Time: ${currentTime}
`;
    await sendSms("+4407460469504", message);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send SMS" });
  }
};
