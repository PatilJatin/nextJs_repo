import { z } from "zod";

const userInfoZodSchema = z
  .object({
    name: z.string().min(1).max(255),
    email: z.string().min(1).max(255),
    phoneNo: z.number(),
    query: z.string().optional(),
  })
  .strict();

export { userInfoZodSchema };
