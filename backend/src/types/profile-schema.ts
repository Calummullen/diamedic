import { z } from "zod";

/**
 * Define schema for ProfileData using Zod
 */
export const profileSchema = z.object({
  name: z.string().min(1, "Name is required."),
  age: z.string().min(1, "Age is required."),
  dateOfBirth: z.string().min(1, "Date of birth is required."),
  email: z.string().min(1, "Email is required"),
  addressLine1: z.string().min(1, "Address Line 1 is required."),
  addressLine2: z.string().optional(),
  city: z.string().min(1, "City is required."),
  county: z.string().optional(),
  postcode: z.string().min(1, "Postcode is required."),
  emergencyInstructions: z
    .string()
    .min(1, "Emergency instructions are required."),
  paymentPlaceholder: z
    .string()
    .min(1, "Payment placeholder is required.")
    .optional(),
  emergencyContacts: z
    .array(
      z.object({
        name: z.string().min(1, "Emergency contact name is required."),
        phone: z.string().min(1, "Emergency contact phone is required."),
        notifySMS: z.boolean(),
      })
    )
    .min(1, "At least one emergency contact is required."),
  insulinTypes: z
    .array(
      z.object({
        type: z.string().min(1, "Insulin type is required."),
        dosage: z.string().min(1, "Insulin dosage is required."),
      })
    )
    .min(1, "At least one insulin type is required."),
});

// Infer TypeScript type from Zod schema
export type ProfileData = z.infer<typeof profileSchema>;
