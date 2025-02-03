import { google } from "googleapis";

export const addRowToGoogleReport = async (invoiceUrl: string) => {
  console.log("inside addRowToGoogleReport");
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"), // Replace escaped \n with actual newlines
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const spreadsheetId = process.env.SPREADSHEET_ID; // Load spreadsheet ID from .env
  const range = "Sheet1!A:E"; // Adjust to match your sheet’s columns

  try {
    // Fetch the current data to find the next available row
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values || [];
    const nextRow = rows.length + 1; // Next available row

    const appendRange = `Sheet1!A${nextRow}:F${nextRow}`; // Dynamically target the next row

    const values = [
      [
        new Date().toLocaleDateString("en-GB"), // Date
        "1x Diamedic Card", // Description
        "Goods", // Category
        invoiceUrl, // Invoice
        10, // Income
        0, // Expense
      ],
    ];

    const resource = { values };

    // Append the data to the next available row
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: appendRange,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    });
  } catch (error) {
    console.error("Error appending row:", error);
  }
};
