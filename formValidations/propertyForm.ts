import { z } from "zod";

export const propertyFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  developerName: z.string().min(1, "Developer Name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  neighborhood: z.string().min(1, "Neighborhood is required"),
  deposit: z.number().min(1, "Must be at least 1"),
  numberOfStoreys: z.number().min(1, "Must be at least 1"),
  numberOfUnits: z.number().min(1, "Must be at least 1"),
  occupancyDate: z.string().min(1, "Occupancy Date is required"),
  maintenanceFees: z.number().min(1, "Must be at least 1"),
  pricedFrom: z.number().min(1, "Must be at least 1"),
  hashtags: z
    .object({ label: z.string(), value: z.string() })
    .array()
    .nonempty("Add at least 1 hashtag"),
  categories: z
    .object({ label: z.string(), value: z.string() })
    .array()
    .nonempty("Add at least 1 category"),
  releaseDate: z.string().min(1, "Release Date is required"),
  overViewImages: z.string().array().nonempty("Select an image"),
  overViewImageInput: z.string(),

  aboutProject: z.string().min(1, "About Project is required"),
  aboutImages: z.string().array().nonempty("Select an image"),
  aboutImagesInput: z.string(),

  featuresAndFinishes: z.string().min(1, "Features & Finishes is required"),
  featureImages: z.string().array().nonempty("Select an image"),
  featureImagesInput: z.string(),

  aboutDeveloper: z.string().min(1, "About Developer is required"),
  developerImages: z.string().array().nonempty("Select an image"),
  developerImagesInput: z.string(),

  attachments: z
    .object({
      title: z.object({
        value: z.string().min(1, "Select a category"),
        label: z.string().min(1, "Select a category"),
      }),
      location: z.string().min(1, "Attachment is required"),
      locationInput: z.string(),
    })
    .array()
    .nonempty("Add at least 1 attachment"),
});
