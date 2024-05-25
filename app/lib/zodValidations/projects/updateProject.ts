import { z } from "zod";
const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

const isValidDate = (value: any) => {
  const date = new Date(value);
  return !isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
};
const updateProjectZodSchema = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
    developerName: z.string().optional(),
    address: z.string().optional(),
    neighborhood: z.string().optional(),
    deposit: z.number().min(0).optional(),
    numberOfStoreys: z.number().int().positive().optional(),
    numberOfUnits: z.number().int().positive().optional(),
    occupancyDate: z
      .string()
      .regex(dateFormatRegex, {
        message: "Date format must be yyyy-mm-dd",
      })
      .refine((value) => isValidDate(value), {
        message: "Invalid date",
      })
      .optional(),
    maintenanceFees: z.number().min(0).optional(),
    pricedFrom: z.number().min(0).optional(),
    hashtags: z.array(z.string()).optional(),
    categories: z.array(z.string()).optional(),
    // closingIn: z.enum([12, 1, 2, 3, 4, 5, 6]),
    overViewImages: z.array(z.string()).optional(),
    city: z.string().optional(),
    releaseDate: z
      .string()
      .regex(dateFormatRegex, {
        message: "Date format must be yyyy-mm-dd",
      })
      .refine((value) => isValidDate(value), {
        message: "Invalid date",
      })
      .optional(),
    aboutProject: z.string().optional(),
    aboutImages: z.array(z.string()).optional(),
    featuresAndFinishes: z.string().optional(),
    featureImages: z.array(z.string()).optional(),
    aboutDeveloper: z.string().optional(),
    developerImages: z.array(z.string()).optional(),
    attachments: z
      .array(
        z.object({
          title: z.string(),
          location: z.string(),
        })
      )
      .optional(),
    // faqs: z.array(z.string()),
    // uploadedByAdmin: z.string(),
    // auditLogs: z.array(z.string()),
    // isSingleFamilyHomeProject: z.boolean(),
    // isUpcomingProject: z.boolean(),
    // isLaunchedRecently: z.boolean(),
    isHidden: z.boolean().optional(),
  })
  .strict();
export { updateProjectZodSchema };
