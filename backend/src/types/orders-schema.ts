import { z } from "zod";
import { addressSchema } from "./profile-schema";

export const orderSchema = z.object({
  userId: z.string().min(1, "UserID is required."),
  stripePaymentReference: z
    .string()
    .min(1, "Stripe payment reference is required."),
  bookingDate: z.string().min(1, "Booking date is required."),
  isComplete: z.boolean().default(false),
  address: addressSchema,
  meta: z.object({
    cardBorderColour: z.string().min(1, "Card border colour is required."),
    cardTextColour: z.string().min(1, "Card text colour is required."),
    matchBorderColor: z.boolean(),
  }),
});

export type Order = z.infer<typeof orderSchema>;
