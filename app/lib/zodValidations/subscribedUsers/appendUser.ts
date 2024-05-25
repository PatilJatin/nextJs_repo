import { z } from "zod";

const appendUserZodSchema = z
  .object({
    userEmail: z.string().min(1).max(255),
  })
  .strict();
export { appendUserZodSchema };
