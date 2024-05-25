import { z } from "zod";

const getAdminZodSchema = z
  .object({
    email: z.string(),
    // .email()
    // .transform((val) => val.toLowerCase()),
    // password: z.string(),
    // isActive: z.boolean(),
    // isSuperAdmin: z.boolean(),
    // firebaseId: z.string(),
  })
  .strict();
export { getAdminZodSchema };
