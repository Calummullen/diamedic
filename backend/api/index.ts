import express, { Request, Response } from "express";
import cors from "cors";
import admin from "firebase-admin";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import {
  decryptData,
  encryptData,
  generateTokens,
  verifyToken,
} from "../helpers/encryption";
import { ProfileData, profileSchema } from "../types/profile-schema";
import QRCode from "qrcode";
import { db, firebaseConfig } from "../helpers/firestore";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = 5000;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig as admin.ServiceAccount),
  });
}
const isProduction = process.env.NODE_ENV === "production";

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

  // Generate a unique user ID
  const docRef = await db.collection("users").add({ encryptedData });
  const userId = docRef.id;

  const { accessToken, refreshToken } = generateTokens(userId);

  await db.collection("users").doc(userId).update({ refreshToken });

  const qrCodeUrl = `${process.env.FRONTEND_BASE_URL}/info/${userId}`;
  const qrCode = await QRCode.toDataURL(qrCodeUrl);

  res
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "strict",
      maxAge: 9000,
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "strict",
      maxAge: 604800000,
    })
    .json({ qrCode });

  // const token = jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: "1h" });

  // Generate a QR code link with the user ID
  // const qrCodeUrl = `${process.env.FRONTEND_BASE_URL}/info/${docRef.id}?token=${token}`;

  // res.json({ qrCodeUrl });
});

/**
 * GET /api/u/:id - Retrieve a user's profile via QR code
 */
app.get("/api/u/:id", verifyToken, async (req: Request, res: Response) => {
  console.log("INSIDE RETRIEVE USERS PROFILE");
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

app.post("/api/refresh-token", async (req: Request, res: Response) => {
  console.log("INSIDE REFRESH TOKEN", req.cookies);
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ error: "No refresh token provided" });
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!
    ) as {
      userId: string;
    };

    const { userId } = decoded;

    const { accessToken, refreshToken: newRefreshToken } =
      generateTokens(userId);

    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: "strict",
        maxAge: 9000,
      })
      .cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: "strict",
        maxAge: 604800000,
      })
      .json({ message: "Token refreshed successfully" });
  } catch (err) {
    return res.status(403).json({ error: "Invalid refresh token" });
  }
});

// // Middleware to verify JWT token (from query parameter)
// function verifyToken(req: any, res: any, next: any) {
//   console.log("here", req.query);
//   const token = req.query.token; // Extract token from the URL query parameter
//   if (!token) {
//     return res.status(403).json({ error: "No token provided" });
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!);
//     req.user = decoded; // Attach decoded data to request object
//     next();
//   } catch (err) {
//     return res.status(401).json({ error: "Invalid or expired token" });
//   }
// }

app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(PORT, () => {
  console.log(`Server ready on port ${PORT}`);
});
