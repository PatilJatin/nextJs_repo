import { PROJECT_MODEL } from "@/types/properties.types";

export const initialProperty: PROJECT_MODEL = {
  _id: "", // Optional property
  name: "",
  description: "", // Optional property
  developerName: "", // Optional property
  deposit: 0,
  address: "", // Optional property
  city: "",
  country: "",
  neighborhood: "", // Optional property
  numberOfStoreys: 0, // Optional property
  numberOfUnits: 0, // Optional property
  occupancyDate: "", // Optional property
  maintenanceFees: 0, // Optional property
  pricedFrom: 0, // Optional property
  categories: [],
  hashtags: [],
  closingIn: 0,
  overViewImages: [],
  aboutProject: "", // Optional property
  aboutImages: [],
  featuresAndFinishes: "", // Optional property
  featureImages: [],
  aboutDeveloper: "", // Optional property
  developerImages: [],
  attachments: [],
  faqs: [],
  uploadedByAdmin: "",
  auditLogs: [], // Can't determine exact type from provided data
  isSingleFamilyHomeProject: false,
  isUpcomingProject: false,
  isLaunchedRecently: false,
  createdAt: "",
  updatedAt: "",

  releaseDate: "",
  isHidden: false,
};
