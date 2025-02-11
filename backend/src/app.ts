import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoute";
import Stripe from "stripe";
import {
  addToMailingList,
  sendOrderConfirmationEmail,
  sendShippingEmail,
} from "./services/emailService";
import { addRowToGoogleReport } from "./services/googleDocsService";
import { rateLimit } from "express-rate-limit";
import { db } from "./helpers/firestore";
import { createOrder } from "./services/ordersService";
import { Order } from "./types/orders-schema";

dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  limit: 50,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: "Too many requests, please try again later.",
});

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    if (!sig) return res.status(400).send("Missing Stripe signature");

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (error) {
      console.error(
        "❌ Stripe Signature Verification Failed:",
        (error as Error).message
      );
      return res.status(400).send(`Webhook Error: ${(error as Error).message}`);
    }

    if (event.type !== "checkout.session.completed") {
      return res.status(200).send("Webhook received");
    }

    const session = event.data.object as Stripe.Checkout.Session;
    const paymentIntentId = session.payment_intent as string;
    const customerEmail = session.customer_details?.email;
    const userId = session.metadata?.userId;

    if (!customerEmail || !userId) {
      console.error("❌ Missing required data:", { customerEmail, userId });
      return res.status(400).send("Missing customer email or userId.");
    }

    try {
      // ✅ 1. Fetch User Metadata from Firestore
      const userDoc = await db.collection("users").doc(userId).get();
      if (!userDoc.exists)
        throw new Error(`User ${userId} not found in Firestore.`);
      const userData = userDoc.data();

      // ✅ 2. Update Firestore user status to hasPaid: true
      await db.collection("users").doc(userId).update({ hasPaid: true });
      console.log(`✅ User ${userId} marked as paid.`);

      // ✅ 3. Store Order in Firestore
      const orderData: Order = {
        userId,
        stripePaymentReference: paymentIntentId,
        bookingDate: new Date().toISOString(),
        status: "not-complete",
        address: {
          name: session.customer_details?.name || "",
          addressLine1: session.customer_details?.address?.line1 || "",
          addressLine2: session.customer_details?.address?.line2 || "",
          city: session.customer_details?.address?.city || "",
          postcode: session.customer_details?.address?.postal_code || "",
        },
        meta: {
          cardBorderColour: userData?.meta.cardBorderColour || "",
          cardTextColour: userData?.meta.cardTextColour || "",
          matchBorderColour: userData?.meta.matchBorderColour ?? false,
        },
      };
      await createOrder(orderData);
      console.log(`✅ Order stored successfully for ${userId}`);

      // ✅ 4. Add User to Mailing List
      await safeExecute(
        () => addToMailingList(customerEmail, session.customer_details?.name!),
        `Add ${customerEmail} to mailing list`
      );

      // ✅ 5. Generate Invoice & Add to Google Report
      if (session.invoice) {
        const invoice = await stripe.invoices.retrieve(
          session.invoice.toString()
        );
        await safeExecute(
          () => addRowToGoogleReport(invoice.hosted_invoice_url || "N/A"),
          "Add to Google report"
        );
      }

      // ✅ 6. Send Shipping & Confirmation Emails
      await safeExecute(
        () => sendShippingEmail(session.customer_details!),
        `Send shipping email to ${customerEmail}`
      );
      await safeExecute(
        () => sendOrderConfirmationEmail(customerEmail, paymentIntentId),
        `Send order confirmation to ${customerEmail}`
      );

      return res.status(200).send("Webhook processed successfully.");
    } catch (error) {
      console.error(`❌ Error processing webhook for user ${userId}:`, error);
      return res.status(500).send("Internal Server Error");
    }
  }
);

// Helper function for safe execution of async functions
const safeExecute = async (fn: Function, actionDescription: string) => {
  try {
    await fn();
    console.log(`✅ Success: ${actionDescription}`);
  } catch (error) {
    console.error(`❌ Failed: ${actionDescription}`, error);
  }
};

// Middleware
app.use(cors({ origin: process.env.FRONTEND_BASE_URL, credentials: true }));
app.use(limiter);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api", userRoutes);

export default app;
