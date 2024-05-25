export type ATTACHMENT = {
  title: string;
  location: string;
  _id?: string;
};

export type PROJECT_RESPONSE = {
  _id: string; // Optional property
  name: string;
  description: string; // Optional property
  developerName: string; // Optional property
  deposit: number;
  address: string; // Optional property
  city: string;
  country: string;
  neighborhood: string; // Optional property
  numberOfStoreys: number; // Optional property
  numberOfUnits: number; // Optional property
  occupancyDate: string; // Optional property
  maintenanceFees: number; // Optional property
  pricedFrom: number; // Optional property
  categories: string[];
  hashtags: string[];
  closingIn: number;
  overViewImages: string[];
  aboutProject: string; // Optional property
  aboutImages: string[];
  featuresAndFinishes: string; // Optional property
  featureImages: string[];
  aboutDeveloper: string; // Optional property
  developerImages: string[];
  attachments: ATTACHMENT[];
  faqs: string[];
  uploadedByAdmin: string;
  auditLogs: any[]; // Can't determine exact type from provided data
  isSingleFamilyHomeProject: boolean;
  isUpcomingProject: boolean;
  isLaunchedRecently: boolean;
  createdAt: string;
  updatedAt: string;
  isHidden: boolean;
  releaseDate: string;
};

export type PROJECT_MODEL = {
  _id: string; // Optional property
  name: string;
  description: string; // Optional property
  developerName: string; // Optional property
  deposit: number;
  address: string; // Optional property
  city: string;
  country: string;
  neighborhood: string; // Optional property
  numberOfStoreys: number; // Optional property
  numberOfUnits: number; // Optional property
  occupancyDate: string; // Optional property
  maintenanceFees: number; // Optional property
  pricedFrom: number; // Optional property
  categories: string[];
  hashtags: string[];
  closingIn: number;
  overViewImages: string[];
  aboutProject: string; // Optional property
  aboutImages: string[];
  featuresAndFinishes: string; // Optional property
  featureImages: string[];
  aboutDeveloper: string; // Optional property
  developerImages: string[];
  attachments: ATTACHMENT[];
  faqs: string[];
  uploadedByAdmin: string;
  auditLogs: any[]; // Can't determine exact type from provided data
  isSingleFamilyHomeProject: boolean;
  isUpcomingProject: boolean;
  isLaunchedRecently: boolean;
  createdAt: string;
  updatedAt: string;
  isHidden: boolean;

  releaseDate: string;
};
