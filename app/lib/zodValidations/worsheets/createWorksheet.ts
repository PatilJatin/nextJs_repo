import { z } from "zod";

const createWorksheetZodSchema = z.object({
  projectName: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  streetAddress: z.string(),
  addressLine1: z.string(),
  city: z.string(),
  provinceName: z.string(),
  postalCode: z.string(), // Assuming postal code is a string
  phoneNumber: z.number(),
  dob: z.string(),
  email: z.string(),
  jobTitle: z.string(),
  sin: z.string(),
  employerName: z.string(),
  suiteChoice1: z.object({
    floorPlan: z.string(),
    floorName: z.string(),
  }),
  suiteChoice2: z
    .object({
      floorPlan: z.string(),
      floorName: z.string(),
    })
    .optional(),
  suiteChoice3: z
    .object({
      floorPlan: z.string(),
      floorName: z.string(),
    })
    .optional(),
  is2ndPurchaser: z.boolean().optional(),
  firstNameOf2ndPurchaser: z.string().optional(),
  lastNameOf2ndPurchaser: z.string().optional(),
  streetAddressOf2ndPurchaser: z.string().optional(),
  addressLine1Of2ndPurchaser: z.string().optional(),
  cityOf2ndPurchaser: z.string().optional(),
  provinceNameOf2ndPurchaser: z.string().optional(),
  postalCodeOf2ndPurchaser: z.number().optional(),
  phoneNumberOf2ndPurchaser: z.number().optional(),
  dobOf2ndPurchaser: z.string().optional(),
  emailOf2ndPurchaser: z.string().optional(),
  jobTitleOf2ndPurchaser: z.string().optional(),
  sinOf2ndPurchaser: z.string().optional(),
  employerNameOf2ndPurchaser: z.string().optional(),
  investorOrEndUser: z.enum(["Investor", "End user"]).optional(),
  hasOptedForParking: z.enum(["Yes", "No", "Not Applicable"]).optional(),
  hasOptedForLocker: z.enum(["Yes", "No", "Not Applicable"]).optional(),
  isCanadianCitizen: z.boolean().optional(),
  notes: z.string().optional(),
  dlOrPassport: z
    .array(
      z.object({
        filename: z.string(),
        link: z.string(),
      })
    )
    .optional(),
  salesPerson: z.string().optional(),
});

export { createWorksheetZodSchema };
