import { z } from "zod";

const createInvestingInPropertiesSchema = z.object({
  title: z.string(),
  description: z.string(),
  imageSrc: z.string(),
  isImageRightSide: z.boolean(),
});

export { createInvestingInPropertiesSchema };
