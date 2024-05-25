import { z } from "zod";

// Zod schema for Contact Us
const contactUsSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .transform((val) => val.toLowerCase()),
  phoneNumber: z.string().min(2, { message: "Minimum length should be 2" }),
  address: z.string().min(2, { message: "Minimum length should be 2" }),
  image: z.string().min(2, { message: "Minimum length should be 2" }),
});

// Zod schema for Contact Us
const contactUsSchemaUpdate = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .transform((val) => val.toLowerCase())
    .optional(),
  phoneNumber: z.string().min(2, { message: "Minimum length should be 2" }).optional(),
  address: z.string().min(2, { message: "Minimum length should be 2" }).optional(),
  image: z.string().min(2, { message: "Minimum length should be 2" }).optional(),
});

export { contactUsSchema, contactUsSchemaUpdate };
