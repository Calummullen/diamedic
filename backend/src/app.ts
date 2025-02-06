import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoute";
import Stripe from "stripe";
import {
  sendOrderConfirmationEmail,
  sendShippingEmail,
} from "./services/emailService";
import { addRowToGoogleReport } from "./services/googleDocsService";
import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  limit: 50, // Allow up to 30 requests per IP per window.
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  message: "Too many requests, please try again later.",
});

dotenv.config();

const app = express();

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const sig = request.headers["stripe-signature"];

    if (!sig) {
      return response.status(400).send("Missing Stripe signature");
    }
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (error) {
      console.error(
        "Stripe Signature Verification Failed:",
        (error as Error).message
      );
      return response
        .status(400)
        .send(`Webhook Error: ${(error as Error).message}`);
    }
    response.status(200).send();

    if (event!.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const paymentIntentId = session.payment_intent as string;
      const customerData = session.customer_details!;

      if (!session.customer_details?.email) {
        console.error(
          "Failed to find customer_details",
          session.customer_details
        );
      }

      // Generate Invoice, Send Order Confirmation and append row to report
      try {
        const invoice = await stripe.invoices.retrieve(
          session.invoice?.toString()!
        );
        await addRowToGoogleReport(invoice.hosted_invoice_url || "N/A");
      } catch (error) {
        console.error(
          `Unable to add row to Google report for ${customerData.email}`,
          error
        );
      }

      try {
        await sendShippingEmail(customerData);
      } catch (error) {
        console.error(
          `Unable to generate shipping label for ${customerData.email}`,
          error
        );
      }
      try {
        await sendOrderConfirmationEmail(
          customerData?.email!,
          paymentIntentId.toString()
        );
      } catch (error) {
        console.error(
          `Unable to send order confirmation email tp ${customerData.email}`,
          error
        );
      }
      return response.status(200).send("Webhook received");
    }
    return response.status(200).send("Webhook received");
  }
);

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_BASE_URL,
    credentials: true,
  })
);
app.use(limiter);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api", userRoutes);

export default app;
