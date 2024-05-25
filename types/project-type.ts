import { FAQ } from "./faq-type";

interface Project {
  _id: string;
  name: string;
  description: string;
  developerName: string;
  address: string;
  city: string;
  country: string;
  neighborhood: string;
  numberOfStoreys: number;
  numberOfUnits: number;
  deposit: number;
  occupancyDate: string;
  maintenanceFees: number;
  pricedFrom: number;
  closingIn: number;
  categories: string[];
  hashtags: string[];
  overViewImages: string[];
  aboutProject: string;
  aboutImages: string[];
  featuresAndFinishes: string;
  featureImages: string[];
  aboutDeveloper: string;
  developerImages: string[];
  attachments: { title: string; location: string; _id: string }[];
  faqs: FAQ[];
  uploadedByAdmin: string;
  auditLogs: string[];
  isSingleFamilyHomeProject: boolean;
  isUpcomingProject: boolean;
  isLaunchedRecently: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type { Project };
