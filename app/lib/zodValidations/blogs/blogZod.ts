import { z } from "zod";

const blogCreateSchema = z.object({
  title: z.string().trim().min(2, "Minimum length should be 2"),
  authorId: z.string().trim(),
  about: z.string().trim().min(2, "Minimum length should be 2"),
  bannerUrl: z.string().trim(),
  isRelatedToHowToScreen: z.boolean().optional(),
});

const blogUpdateSchema = z.object({
  title: z.string().trim().min(2, "Minimum length should be 2").optional(),
  about: z.string().trim().min(2, "Minimum length should be 2").optional(),
  bannerUrl: z.string().trim().optional(),
  isRelatedToHowToScreen: z.boolean().optional(),
  authorId: z.string().trim().optional()
});
export { blogCreateSchema, blogUpdateSchema };
