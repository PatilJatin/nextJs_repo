import { z } from "zod";

const updatePrivacyPolicyZodSchema = z
  .object({
    content: z.string(),
  })
  .strict();
export { updatePrivacyPolicyZodSchema };
