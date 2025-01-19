import express, { Request, Response } from "express";
import cors from "cors";
import { z } from "zod";

require("dotenv").config();

const app = express();
const PORT = 5000;

const baseUrl = process.env.BASE_URL || "http://localhost:5000";

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
 * POST /api/users: Validate input and return an encrypted QR code link
 */
app.post("/api/users", (req: Request, res: Response) => {
  const result = profileSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      errors: result.error.format(),
    });
  }

  const userData: ProfileData = result.data;
  console.log("Validated userData", userData);

  // Encode data as Base64
  const data = Buffer.from(JSON.stringify(userData)).toString("base64");

  res.json({ data });
});

/**
 * GET /api/u: Decode the Base64 data from the QR code and redirect to the info page
 */
app.get("/api/u", (req: Request, res: Response) => {
  const encryptedData = req.query.data;
  if (!encryptedData) {
    return res.status(400).json({ error: "No data provided" });
  }

  try {
    // Decode the Base64 data
    const decodedData = Buffer.from(
      encryptedData as string,
      "base64"
    ).toString();
    // Redirect to the info page with the decoded data
    res.redirect(
      `https://diamedic.co.uk/info?data=${encodeURIComponent(decodedData)}`
    );
  } catch (error) {
    res.status(400).json({ error: "Invalid or corrupted data" });
  }
});

app.get("/", (req, res) => res.send("Express on Vercel"));

// Start the server
app.listen(PORT, () => {
  console.log(`Server ready on port ${PORT}`);
});
