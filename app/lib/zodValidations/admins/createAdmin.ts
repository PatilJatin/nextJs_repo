import { z } from "zod";

const createAdminZodSchema = z
  .object({
    name: z.string().min(1).max(255),
    email: z
      .string()
      .email()
      .transform((val) => val.toLowerCase()),
    password: z.string(),
    // isActive: z.boolean(),
    // isSuperAdmin: z.boolean(),
    // firebaseId: z.string(),
  })
  .strict();
export { createAdminZodSchema };
