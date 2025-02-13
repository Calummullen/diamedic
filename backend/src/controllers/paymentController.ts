import Stripe from "stripe";
import { Request, Response } from "express";
import * as Sentry from "@sentry/node";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const paymentController = async (req: Request, res: Response) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required." });
  }
  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      metadata: {
        userId: userId,
      },
      payment_method_types: ["card"],
      line_items: [
        {
          price: "price_1QoORbEVYNMmSuP6jRlYToPC",
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_creation: "always",
      invoice_creation: {
        enabled: true,
      },
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["GB"],
      },
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
    Sentry.withScope((scope) => {
      scope.setContext(
        "Checkout Session: Error retrieving checkout session",
        req.body
      );
      Sentry.captureException(error);
    });
    res.status(500).json({ error: "Internal server error" });
  }
};
