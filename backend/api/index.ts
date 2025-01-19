import express, { Request, Response } from "express";
import cors from "cors";

require("dotenv").config();

const app = express();
const PORT = 5000;

const baseUrl = process.env.BASE_URL || "http://localhost:5000";

// Middleware
app.use(cors());
app.use(express.json());

/**
 * POST /users: Return an encrypted QR code link
 */
app.post("/api/users", (req: Request, res: Response) => {
  const userData = req.body;
  console.log("userData", userData);

  const data = Buffer.from(JSON.stringify(userData)).toString("base64");

  res.json({ data });
});

/**
 * GET /u: Decode the Base64 data from the QR code and redirect to the info page
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
