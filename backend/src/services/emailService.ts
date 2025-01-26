import { Resend } from "resend";

export const sendOrderConfirmationEmail = async (to: string, id: string) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

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
            <p><strong>Total:</strong> £10.00</p>
          </div>
          <div class="footer">
            <p>If you have any questions or any problems, feel free to <a href="mailto:calum.diamedic@gmail.com">contact us</a> and quote the number ${id}.</p>
            <p>Thank you for choosing Diamedic!</p>
          </div>
        </div>
      </body>
    </html>`,
  });
};
