import express from "express";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();
const PORT = 5000;

// In-memory storage for users (temporary for this example)
const users: Record<string, any> = {};

// Secret for JWT signing (use a more secure secret in production)
const JWT_SECRET = "your-secure-jwt-secret";

// Middleware for JSON parsing
app.use(cors());
app.use(express.json());

// POST /users: Create a new user and return a JWT for their data
app.post("/users", (req, res) => {
  const userId = uuidv4();
  const userData = req.body;

  // Store user data in memory (temporary)
  users[userId] = userData;

  // Generate JWT token for secure access to the user's data
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });

  res.json({ userId, token });
});

app.get("/users/:userId", verifyToken, (req, res) => {
  const { userId } = req.params;

  if (!users[userId]) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(users[userId]);
});

// Middleware to verify JWT token (from query parameter)
function verifyToken(req: any, res: any, next: any) {
  const token = req.query.token; // Extract token from the URL query parameter

  if (!token) {
    return res.status(403).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach decoded data to request object
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
