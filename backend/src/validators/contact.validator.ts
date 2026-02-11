import {email, z} from "zod";

export const createContactSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required"),

  email: z
    .string()
    .email("Invalid email address"),

  phone: z
    .string()
    .min(7, "Phone number is too short")
    .max(15, "Phone number is too long"),

  company: z
    .string()
    .optional(),

  status: z
    .enum(["Lead", "Prospect", "Customer"])
    .optional()
    .default("Lead"),

  notes: z
    .string()
    .optional(),
});

export type CreateContactInput = z.infer<typeof createContactSchema>