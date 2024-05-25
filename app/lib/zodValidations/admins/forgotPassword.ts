import { z } from "zod";

const forgotPasswordZodSchema = z
  .object({
    email: z.string().min(1).max(255),
  })
  .strict();

export { forgotPasswordZodSchema };
