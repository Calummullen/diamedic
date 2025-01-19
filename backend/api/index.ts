import express, { Request, Response } from "express";
import cors from "cors";
import { z } from "zod";
import admin from "firebase-admin";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5000;

const firebaseConfig = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"), // Fix newlines
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
  universe_domain: "googleapis.com",
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig as admin.ServiceAccount),
  });
}

const db = admin.firestore();

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY!; // Must be 32 bytes
const IV_LENGTH = 16; // AES block size (must be 16 bytes)

// Middleware
app.use(cors());
app.use(express.json());

/**
 * Define schema for ProfileData using Zod
 */
const profileSchema = z.object({
  name: z.string().min(1, "Name is required."),
  age: z.string().min(1, "Age is required."),
  dateOfBirth: z.string().min(1, "Date of birth is required."),
  addressLine1: z.string().min(1, "Address Line 1 is required."),
  addressLine2: z.string().optional(),
  city: z.string().min(1, "City is required."),
  county: z.string().optional(),
  postcode: z.string().min(1, "Postcode is required."),
  emergencyInstructions: z
    .string()
    .min(1, "Emergency instructions are required."),
  paymentPlaceholder: z.string().min(1, "Payment placeholder is required."),
  emergencyContacts: z
    .array(
      z.object({
        name: z.string().min(1, "Emergency contact name is required."),
        phone: z.string().min(1, "Emergency contact phone is required."),
      })
    )
    .min(1, "At least one emergency contact is required."),
  insulinTypes: z
    .array(
      z.object({
        type: z.string().min(1, "Insulin type is required."),
        dosage: z.string().min(1, "Insulin dosage is required."),
      })
    )
    .min(1, "At least one insulin type is required."),
});

// Infer TypeScript type from Zod schema
type ProfileData = z.infer<typeof profileSchema>;

/**
 * Encrypts the user data before storing it in Firestore
 */
const encryptData = (data: any): string => {
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
const decryptData = (encryptedData: string): any => {
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

  // Generate a QR code link with the user ID
  const qrCodeUrl = `${process.env.FRONTEND_BASE_URL}/info/${docRef.id}`;

  res.json({ qrCodeUrl });
});

/**
 * GET /api/u/:id - Retrieve a user's profile via QR code
 */
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
