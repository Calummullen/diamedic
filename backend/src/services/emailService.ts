import { Resend } from "resend";
import PDFDocument from "pdfkit";
import path from "path";
import fs from "fs";
import Stripe from "stripe";
import * as Sentry from "@sentry/node";

const resend = new Resend(process.env.RESEND_API_KEY);

export const addToMailingList = async (email: string, name: string) => {
  const AUDIENCE_ID = "10819839-7d7c-4d70-94d8-9add02c62c3b";

  return await resend.contacts.create({
    email,
    firstName: name,
    lastName: name,
    audienceId: AUDIENCE_ID,
    unsubscribed: false,
  });
};

export const sendOrderConfirmationEmail = async (
  to: string,
  paymentId: string
) => {
  return await resend.emails.send({
    from: "Diamedic <no-reply@diamedic.co.uk>",
    to: to,
    subject: "Order Confirmation",
    html: `<html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            padding: 20px;
          }
          .header {
            text-align: center;
            padding: 10px 0;
          }
          .header h1 {
            font-size: 24px;
            color: #005EB8;
            margin: 0;
          }
          .header p {
            font-size: 14px;
            color: #888;
            margin: 5px 0 15px;
          }
          .order-details {
            margin: 20px 0;
          }
          .order-details h2 {
            font-size: 18px;
            border-bottom: 1px solid #e0e0e0;
            padding-bottom: 5px;
            color: #005EB8;
          }
          .order-details p {
            margin: 5px 0;
            font-size: 14px;
          }
          .footer {
            text-align: center;
            font-size: 12px;
            color: #777;
            margin-top: 20px;
          }
          .footer a {
            color: #4caf50;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Order Confirmation</h1>
            <p>Thank you for your order!</p>
          </div>
          <div class="order-details">
            <h2>Order Details</h2>
            <p><strong>Item:</strong> DiaMedic Card</p>
            <p><strong>Quantity:</strong> 1</p>
            <p><strong>Total:</strong> £12.99</p>
            <p><strong>Payment ID:</strong> ${paymentId}</p>
          </div>
          <div class="footer">
            <p>If you have any questions or any problems, feel free to <a href="mailto:calum@diamedic.co.uk">contact us</a> and quote the above payment ID.</p>
            <p>Thank you for choosing Diamedic!</p>
          </div>
        </div>
      </body>
    </html>`,
  });
};

export const generateShippingDetails = async (
  customerData: Stripe.Checkout.Session.CustomerDetails
): Promise<Buffer> => {
  // Define PDF dimensions (15x10 cm = 425 x 283 points)
  const doc = new PDFDocument({
    size: [288, 216],
    margins: { top: 20, bottom: 0, left: 10, right: 5 },
  });

  const bufferChunks: Buffer[] = [];

  doc.on("data", (chunk) => bufferChunks.push(chunk));
  doc.on("end", () => console.log("PDF generation complete"));

  // Layout the page with two columns
  doc
    .fontSize(20)
    .text(
      `${customerData.name ?? ""}\n${customerData.address?.line1 ?? ""}\n${
        customerData.address?.line2 ?? ""
      }\n${customerData.address?.city ?? ""}\n${
        customerData.address?.postal_code ?? ""
      }`,
      10,
      20,
      { width: 100 }
    );

  doc
    .fontSize(8)
    .text(
      `Return Address:\nDiamedic\n18a Walliscote Road South\nWeston-super-Mare\nUnited Kingdom`,
      200,
      20,
      { width: 80 }
    );

  // Finalize PDF
  doc.end();

  return new Promise<Buffer>((resolve, reject) => {
    doc.on("end", () => resolve(Buffer.concat(bufferChunks)));
    doc.on("error", (err) => reject(err));
  });
};

export const sendShippingEmail = async (
  customerData: Stripe.Checkout.Session.CustomerDetails,
  userId: string
) => {
  try {
    // Generate the shipping label PDF
    const pdfBuffer = await generateShippingDetails(customerData);
    const pdfBase64 = pdfBuffer.toString("base64");

    // Send the email with the PDF attachment
    const emailResponse = await resend.emails.send({
      from: "Shipping Diamedic <no-reply@diamedic.co.uk>", // Use a verified sender email
      to: "calum@diamedic.co.uk",
      subject: "Your Shipping Label",
      html: `
        <p>Shipping label for ${customerData.email} ${userId}</p>
      `,
      attachments: [
        {
          filename: `${customerData.email}_shipping_label.pdf`,
          content: pdfBase64,
          contentType: "application/pdf",
        },
      ],
    });

    return emailResponse;
  } catch (error) {
    Sentry.withScope((scope) => {
      scope.setContext("Email Service: Failed to send shipping label", {
        customerData,
      });
      Sentry.captureException(error);
    });
    throw error;
  }
};
