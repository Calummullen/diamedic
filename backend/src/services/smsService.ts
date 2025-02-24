import twilio from "twilio";
import * as Sentry from "@sentry/node";

export const sendSms = async (phoneNumber: string, message: string) => {
  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  return await client.messages.create({
    body: message,
    from: "Diamedic",
    to: `+44${phoneNumber}`,
  });
};
