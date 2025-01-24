import { Firestore } from "@google-cloud/firestore";
import dotenv from "dotenv";

dotenv.config();

export const firebaseConfig = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: Buffer.from(
    process.env.FIREBASE_PRIVATE_KEY || "",
    "base64"
  ).toString("utf8"),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
  universe_domain: "googleapis.com",
};

export const db = new Firestore({
  projectId: process.env.FIREBASE_PROJECT_ID,
  credentials: {
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    private_key: Buffer.from(
      process.env.FIREBASE_PRIVATE_KEY || "",
      "base64"
    ).toString("utf8"),
  },
  preferRest: true, // ✅ Forces REST API instead of gRPC
});
