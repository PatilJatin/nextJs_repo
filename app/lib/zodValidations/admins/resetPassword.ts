import { z } from "zod";

const resetPasswordZodSchema = z
  .object({
    newPassword: z.string().min(1).max(255),
  })
  .strict();

export { resetPasswordZodSchema };
