import { z } from "zod";

const updateOwnerInfoZodSchema = z
  .object({
    name: z.string(),
    role: z.string(),
    designation: z.string(),
    speciality: z.array(z.string()),
    areaCovered: z.array(z.string()),
    description: z.string(),
    image: z.string(),
  })
  .strict();

export { updateOwnerInfoZodSchema };
