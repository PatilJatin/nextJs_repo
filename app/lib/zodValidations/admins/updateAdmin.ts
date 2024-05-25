import { z } from "zod";

const updateAdminZodSchema = z
  .object({
    name: z.string().min(1).max(255).optional(),
    isActive: z.boolean().optional(),
  })
  .strict();
export { updateAdminZodSchema };
