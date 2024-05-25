import { WORKSHEET_MODEL, WORKSHEET_RESPONSE } from "@/types/worksheets.types";

export const mapWorksheetToModel = (
  data: WORKSHEET_RESPONSE
): WORKSHEET_MODEL => {
  return {
    _id: data._id,
    projectName: data.projectName,
    firstName: data.firstName,
    lastName: data.lastName,
    streetAddress: data.streetAddress,
    addressLine1: data.addressLine1,
    city: data.city,
    provinceName: data.provinceName,
    postalCode: data.postalCode,
    phoneNumber: data.phoneNumber,
    dob: data.dob,
    email: data.email,
    jobTitle: data.jobTitle,
    sin: data.sin,
    employerName: data.employerName,
    suiteChoice1: data.suiteChoice1,
    suiteChoice2: data.suiteChoice2,
    suiteChoice3: data.suiteChoice3,
    is2ndPurchaser: data.is2ndPurchaser,
    investorOrEndUser: data.investorOrEndUser,
    hasOptedForParking: data.hasOptedForParking,
    hasOptedForLocker: data.hasOptedForLocker,
    notes: data.notes,
    dlOrPassport: data.dlOrPassport,
    salesPerson: data.salesPerson,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    isCanadianCitizen: data.isCanadianCitizen,
  };
};
