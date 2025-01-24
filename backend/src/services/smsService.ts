import twilio from "twilio";

export const sendSms = async (phoneNumber: string, message: string) => {
  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  return client.messages.create({
    body: message,
    from: "Diamedic",
    to: phoneNumber,
  });
};
