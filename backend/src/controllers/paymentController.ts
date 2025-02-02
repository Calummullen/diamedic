import Stripe from "stripe";
import { Request, Response } from "express";
import { sendOrderConfirmationEmail } from "../services/emailService";

const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY!);

export const paymentController = async (req: Request, res: Response) => {
  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      payment_method_types: ["card"],
      line_items: [
        {
          price: "price_1Qnr74IXyhVTXfbeW4Is2wDG",
          quantity: 1,
        },
      ],
      mode: "payment",
      return_url: `${process.env.FRONTEND_BASE_URL}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
    });

    return res.send({ clientSecret: session.client_secret });
  } catch (error) {}
};

export const getPaymentSessionController = async (
  req: Request,
  res: Response
) => {
  try {
    const sessionId = req.query.session_id as string | undefined;

    if (!sessionId) {
      return res.status(400).json({ error: "Missing session_id parameter" });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    res.json({
      status: session.status,
      customer_email: session.customer_details?.email || "No email provided",
      payment_id: session.payment_intent,
    });
  } catch (error) {
    console.error("Error retrieving checkout session:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const paymentWebhookController = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"];

  try {
    if (!sig) {
      return res.status(400).send("Missing Stripe signature");
    }

    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    console.log("event", event);

    if (event.type === "checkout.session.completed") {
      const { customer_details } = event.data.object as Stripe.Checkout.Session;

      if (!customer_details?.email) {
        console.error("Failed to find customer_details", customer_details);
      }
      try {
        await sendOrderConfirmationEmail(customer_details!.email!);
      } catch (error: any) {
        console.error(
          "Failed to send order confirmation email:",
          error.message
        );
      }
    }
  } catch (error) {}
};
