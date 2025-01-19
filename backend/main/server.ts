import express, { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";
import CryptoJS from "crypto-js";

const app = express();
const PORT = 5000;

// Secret for encryption (must match frontend)
const ENCRYPTION_KEY = "your-encryption-key"; // Use a more secure key in production

// Middleware
app.use(cors());
app.use(express.json());

/**
 * POST /users: Return an encrypted QR code link
 */
app.post("/users", (req: Request, res: Response) => {
  // const userId = uuidv4();
  const userData = req.body;
  console.log("userData", userData);

  const data = Buffer.from(JSON.stringify(userData)).toString("base64");

  // Generate the QR code link
  // const qrCodeUrl = `https://localhost:5000/u?data=${encodeURIComponent(
  //   base64Encoded
  // )}`;

  res.json({ data });
});

// /**
//  * GET /u: Handle QR code scan, decrypt user ID, and return user data
//  */
// app.get("/u", (req, res) => {
//   console.log("here1");
//   const encryptedData = req.query.data;
//   console.log("here2", encryptedData);
//   if (!encryptedData) {
//     return res.status(400).json({ error: "No data provided" });
//   }

//   try {
//     res.redirect(
//       `https://localhost:5173/info?data=${encodeURIComponent(
//         JSON.stringify(encryptedData)
//       )}`
//     );
//   } catch (error) {
//     res.status(400).json({ error: "Invalid or corrupted data" });
//   }
// });

/**
 * GET /u: Decode the Base64 data from the QR code and redirect to the info page
 */
app.get("/u", (req: Request, res: Response) => {
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
      `http://localhost:5173/info?data=${encodeURIComponent(decodedData)}`
    );
  } catch (error) {
    res.status(400).json({ error: "Invalid or corrupted data" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
