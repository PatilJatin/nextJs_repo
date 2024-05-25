import { z } from "zod";

export const homeDetailsFormSchema = z.object({
  navigationImages: z.string().array().nonempty("Add at least 1 image"),
  heroSliderImages: z.string().array().nonempty("Add at least 1 image"),
  socialLinks: z
    .object({
      name: z.string().min(1, "Name is required"),
      link: z.string().min(1, "Link is required"),
    })
    .array()
    .nonempty("Add at least 1 social media link"),
  footerDescription: z.string().min(1, "Footer Description is required"),
  featuredInSection: z
    .object({
      imageSrc: z.string().min(1, "Image is required"),
      sourceLink: z.string().min(1, "Link is required"),
    })
    .array()
    .nonempty("Add at least 1 Feature"),

  homeAdvertise: z
    .object({
      title: z.string().min(1, "Title is required"),
      description: z.string().min(1, "Description is required"),
      navigateTo: z.string().min(1),
      imageSrc: z.string().min(1),
      // homeAdvertiseImgInput: z.string().min(1, ),
      isImageOnRightSide: z.boolean(),
      buttonText: z.string().min(1, "Button text is required"),
    })
    .array()
    .nonempty("Add at least 1 Section")
    .max(4, "Maximum 4 allowed"),
});
