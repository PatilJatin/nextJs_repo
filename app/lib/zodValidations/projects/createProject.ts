import { z } from "zod";
const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

const isValidDate = (value: any) => {
  const date = new Date(value);
  return !isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
};
const createProjectZodSchema = z
  .object({
    name: z.string(),
    description: z.string(),
    developerName: z.string(),
    address: z.string(),
    neighborhood: z.string(),
    deposit: z.number().min(0),
    numberOfStoreys: z.number().int().positive(),
    numberOfUnits: z.number().int().positive(),
    occupancyDate: z
      .string()
      .regex(dateFormatRegex, {
        message: "Date format must be yyyy-mm-dd",
      })
      .refine((value) => isValidDate(value), {
        message: "Invalid date",
      }),
    maintenanceFees: z.number().min(0),
    pricedFrom: z.number().min(0),
    hashtags: z.array(z.string()),
    categories: z.array(z.string()),
    // closingIn: z.enum([12, 1, 2, 3, 4, 5, 6]),
    overViewImages: z.array(z.string()),
    city: z.string(),
    releaseDate: z
      .string()
      .regex(dateFormatRegex, {
        message: "Date format must be yyyy-mm-dd",
      })
      .refine((value) => isValidDate(value), {
        message: "Invalid date",
      }),
    aboutProject: z.string(),
    aboutImages: z.array(z.string()),
    featuresAndFinishes: z.string(),
    featureImages: z.array(z.string()),
    aboutDeveloper: z.string(),
    developerImages: z.array(z.string()),
    attachments: z.array(
      z.object({
        title: z.string(),
        location: z.string(),
      })
    ),
    // faqs: z.array(z.string()),
    // uploadedByAdmin: z.string(),
    // auditLogs: z.array(z.string()),
    // isSingleFamilyHomeProject: z.boolean(),
    // isUpcomingProject: z.boolean(),
    // isLaunchedRecently: z.boolean(),
  })
  .strict();
export { createProjectZodSchema };
