import { z } from "zod";

export const invPropFormValidations = z.object({
  title: z.string(),
  description: z.string(),
  imageSrc: z.string(),
  isImageRightSide: z.boolean().optional(), 
});
