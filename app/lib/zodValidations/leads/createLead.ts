import { z } from "zod";

// Define Zod validation schema for Lead model
const leadZodSchema = z.object({
  firstName: z.string().min(1).max(255),
  lastName: z.string().min(1).max(255),
  email: z
    .string()
    // .email()
    .transform((val) => val.toLowerCase()),
  query: z.string(),
  sourceName: z.enum(["contact us", "projects"]),
  phoneNumber: z.string(),
});

export { leadZodSchema };
