import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoute";
import Stripe from "stripe";
import { sendOrderConfirmationEmail } from "./services/emailService";
import bodyParser from "body-parser";

dotenv.config();

const app = express();

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const sig = request.headers["stripe-signature"];
    try {
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

      if (event!.type === "checkout.session.completed") {
        const { customer_details } = event.data
          .object as Stripe.Checkout.Session;

        if (!customer_details?.email) {
          console.error("Failed to find customer_details", customer_details);
        }
        try {
          await sendOrderConfirmationEmail(customer_details!.email!);
          return response
            .status(200)
            .send(`Confirmation email sent to ${customer_details?.email}`);
        } catch (error: any) {
          console.error(
            "Failed to send order confirmation email:",
            error.message
          );
        }
      }
    } catch (error) {}
  }
);

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_BASE_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api", userRoutes);

export default app;
