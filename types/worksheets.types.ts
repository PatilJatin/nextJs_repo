export type SUITE_CHOICE = {
  floorPlan: string;
  floorName: string;
  _id: string;
};

export type DL_PASSPORT = {
  filename: string;
  link: string;
  _id: string;
};

export type WORKSHEET_RESPONSE = {
  _id: string;
  projectName: string;
  firstName: string;
  lastName: string;
  streetAddress: string;
  addressLine1: string;
  city: string;
  provinceName: string;
  postalCode: number;
  phoneNumber: number;
  dob: string; // Date of birth, may need to adjust type
  email: string;
  jobTitle: string;
  sin: string; // Social Insurance Number
  employerName: string;
  suiteChoice1: SUITE_CHOICE;
  suiteChoice2: SUITE_CHOICE;
  suiteChoice3: SUITE_CHOICE;
  is2ndPurchaser: boolean;
  investorOrEndUser: string;
  hasOptedForParking: boolean;
  hasOptedForLocker: boolean;
  notes: string;
  dlOrPassport: DL_PASSPORT;
  salesPerson: string;
  createdAt: string;
  updatedAt: string;
  isCanadianCitizen: boolean;
};

export type WORKSHEET_MODEL = {
  _id: string;
  projectName: string;
  firstName: string;
  lastName: string;
  streetAddress: string;
  addressLine1: string;
  city: string;
  provinceName: string;
  postalCode: number;
  phoneNumber: number;
  dob: string; // Date of birth, may need to adjust type
  email: string;
  jobTitle: string;
  sin: string; // Social Insurance Number
  employerName: string;
  suiteChoice1: SUITE_CHOICE;
  suiteChoice2: SUITE_CHOICE;
  suiteChoice3: SUITE_CHOICE;
  is2ndPurchaser: boolean;
  investorOrEndUser: string;
  hasOptedForParking: boolean;
  hasOptedForLocker: boolean;
  notes: string;
  dlOrPassport: DL_PASSPORT;
  salesPerson: string;
  createdAt: string;
  updatedAt: string;
  isCanadianCitizen: boolean;
};
