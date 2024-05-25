import { z } from "zod";

const updateInvestingInPropertiesSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    imageSrc: z.string().optional(),
    isImageRightSide: z.boolean().optional(),
  })
  .strict();

export { updateInvestingInPropertiesSchema };
