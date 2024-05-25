import { z } from "zod";

export const blogFormValidations = z.object({
  title: z.string().min(1, "Title is required.").max(233),
  description: z.string().min(1, "Description is required."),
  authorId: z.object({
    value: z.string().min(1, "Author must be selected"),
    label: z.string(),
  }),
  bannerUrl: z.string().min(1, "Banner Image is required").url(),
});
