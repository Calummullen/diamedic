import express, { Request, Response } from "express";
import cors from "cors";
import admin from "firebase-admin";
import dotenv from "dotenv";
import { decryptData, encryptData } from "../helpers/encryption";
import { ProfileData, profileSchema } from "../types/profile-schema";
import QRCode from "qrcode";
import { db, firebaseConfig, setDoc } from "../helpers/firestore";
import cookieParser from "cookie-parser";
import uuid4 from "uuid4";

dotenv.config();

const app = express();
const PORT = 5000;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig as admin.ServiceAccount),
  });
}

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_BASE_URL, // or '*' if you allow all origins (less secure)
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

/**
 * POST /api/users: Create a new profile and generate a QR code link
 */
app.post("/api/users", async (req: Request, res: Response) => {
  const result = profileSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ errors: result.error.format() });
  }

  const userData: ProfileData = result.data;
  const encryptedData = encryptData(userData);
  const userId = uuid4();
  // Generate a unique user ID
  const docRef = await db
    .collection("users")
    .doc(userId)
    .set({ encryptedData });

  // Create QR Code URL
  const qrCodeUrl = `${process.env.FRONTEND_BASE_URL}/info/${userId}`;
  const qrCode = await QRCode.toDataURL(qrCodeUrl);

  res.json({ qrCode });
});

app.get("/api/u/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const doc = await db.collection("users").doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Profile not found" });
    }

    const encryptedData = doc.data()?.encryptedData;
    const decryptedData = decryptData(encryptedData);

    res.json(decryptedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve data" });
  }
});

/**
 * PUT /api/users/:id - Update a user's profile
 */
app.put("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = profileSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ errors: result.error.format() });
  }

  const updatedData = encryptData(result.data);

  try {
    await db.collection("users").doc(id).update({ encryptedData: updatedData });
    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(PORT, () => {
  console.log(`Server ready on port ${PORT}`);
});
