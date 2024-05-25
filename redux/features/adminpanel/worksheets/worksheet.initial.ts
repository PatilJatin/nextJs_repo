import { WORKSHEET_MODEL } from "@/types/worksheets.types";

export const initialWorksheet: WORKSHEET_MODEL = {
  _id: "",
  projectName: "",
  firstName: "",
  lastName: "",
  streetAddress: "",
  addressLine1: "",
  city: "",
  provinceName: "",
  postalCode: 0,
  phoneNumber: 0,
  dob: "",
  email: "",
  jobTitle: "",
  sin: "",
  employerName: "",
  suiteChoice1: {
    floorPlan: "",
    floorName: "",
    _id: "",
  },
  suiteChoice2: {
    floorPlan: "",
    floorName: "",
    _id: "",
  },
  suiteChoice3: {
    floorPlan: "",
    floorName: "",
    _id: "",
  },
  is2ndPurchaser: false,
  investorOrEndUser: "",
  hasOptedForParking: false,
  hasOptedForLocker: false,
  notes: "",
  dlOrPassport: {
    filename: "",
    link: "",
    _id: "",
  },
  salesPerson: "",
  createdAt: "",
  updatedAt: "",
  isCanadianCitizen: false,
};
