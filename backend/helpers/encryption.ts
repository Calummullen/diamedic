import crypto from "crypto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction } from "express";
import { Request, Response } from "express";

dotenv.config();

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY!; // Must be 32 bytes
const IV_LENGTH = 16; // AES block size (must be 16 bytes)

const SECRET = process.env.JWT_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
const ACCESS_TOKEN_EXPIRY = "15m";
const REFRESH_TOKEN_EXPIRY = "7d";

/**
 * Encrypts the user data before storing it in Firestore
 */
export const encryptData = (data: any): string => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY, "hex"),
    iv
  );

  let encrypted = cipher.update(JSON.stringify(data), "utf8", "hex");
  encrypted += cipher.final("hex");

  return iv.toString("hex") + ":" + encrypted; // Store IV with encrypted data
};

/**
 * Decrypts the data when retrieving from Firestore
 */
export const decryptData = (encryptedData: string): any => {
  const [ivHex, encrypted] = encryptedData.split(":");

  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY, "hex"),
    iv
  );

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return JSON.parse(decrypted);
};

/**
 * Generate JWT Tokens
 */
export const generateTokens = (userId: string) => {
  const accessToken = jwt.sign({ userId }, SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
  const refreshToken = jwt.sign({ userId }, REFRESH_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });
  return { accessToken, refreshToken };
};

/**
 * Middleware to Verify Access Token
 */
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("INSIDE VERIFY TOKEN", req.cookies);
  const token = req.cookies.accessToken;

  if (!token)
    return res.status(401).json({ error: "Unauthorized: No token provided" });

  try {
    const decoded = jwt.verify(token, SECRET) as { userId: string };
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Unauthorized: Invalid token" });
  }
};
