import { z } from "zod";
const socialLinkSchema = z
  .object({
    name: z.string(),
    link: z.string(),
  })
  .strict();

const homeAdvertiseSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    navigateTo: z.string(),
    buttonText: z.string(),
    imageSrc: z.string(),
    isImageOnRightSide: z.boolean(),
  })
  .strict();

const featuredInSectionSchema = z
  .object({
    imageSrc: z.string(),
    sourceLink: z.string(),
  })
  .strict();

const updateHomePageZodSchema = z
  .object({
    heroSliderImages: z.array(z.string()).optional(),
    navigationImages: z.array(z.string()).optional(),
    socialLinks: z.array(socialLinkSchema).optional(),
    homeAdvertise: z.array(homeAdvertiseSchema).optional(),
    featuredInSection: z.array(featuredInSectionSchema).optional(),
    footerDescription: z.string().optional(),
  })
  .strict();
export { updateHomePageZodSchema };
