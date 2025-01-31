import { Request, Response } from "express";
import {
  billingAddressSchema,
  ProfileData,
  profileSchema,
} from "../types/profile-schema";
import {
  createUserProfile,
  getUserProfile,
  updateUserProfile,
} from "../services/userService";
import { sendSms } from "../services/smsService";
import {
  sendOrderConfirmationEmail,
  sendShippingEmail,
} from "../services/emailService";
import { getAddressFromCoordinates } from "../services/locationService";
import { google } from "googleapis";

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
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"), // Replace escaped \n with actual newlines
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const spreadsheetId = process.env.SPREADSHEET_ID; // Load spreadsheet ID from .env
  const range = "Sheet1!A:E"; // Adjust to match your sheet’s columns

  try {
    // Fetch the current data to find the next available row
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values || [];
    const nextRow = rows.length + 1; // Next available row

    const appendRange = `Sheet1!A${nextRow}:F${nextRow}`; // Dynamically target the next row

    const values = [
      [
        new Date().toLocaleDateString("en-GB"), // Timestamp
        "1x Diamedic Card", // Item name
        "Goods", // Amount
        "N/A", // Category
        10,
        0, // Additional notes
      ],
    ];

    const resource = { values };

    // Append the data to the next available row
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: appendRange,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    });

    return res.json({ message: "success" });
  } catch (error) {
    console.error("Error appending row:", error);
  }
};

export const testLabel = async (req: Request, res: Response) => {
  const result = billingAddressSchema.safeParse(req.body);
  try {
    await sendShippingEmail(result.data!);
    return res.json({ message: "Shipping details successfully sent." });
  } catch (error) {
    console.error(
      `Error generating shipping label for user ${result.data?.userId}`,
      error
    );
    // Add to a 2nd DB?
  }
};
