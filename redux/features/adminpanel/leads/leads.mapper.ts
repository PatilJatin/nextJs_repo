import { convertToDDMMYYYY } from "@/helpers/adminpanel/dateTime/convertToDDMMYYYY";
import {
  LEADS_SOURCE_MODEL,
  LEADS_SOURCE_RESPONSE,
  LEADS_TYPES_MODEL,
  LEADS_TYPES_RESPONSE,
} from "@/types/leads.types";

export const mapLeadsTypesToModel = (
  data: LEADS_TYPES_RESPONSE
): LEADS_TYPES_MODEL => {
  return {
    _id: data._id,
    count: data.count,
  };
};

export const mapLeadsSourceToModel = (
  data: LEADS_SOURCE_RESPONSE
): LEADS_SOURCE_MODEL => {
  return {
    _id: data._id,
    email: data.email,
    createdAt: convertToDDMMYYYY(data.createdAt),
    firstName: data.firstName,
    lastName: data.lastName,
    phoneNumber: data.phoneNumber,
    query: data.query,
    sourceName: data.sourceName,
    updatedAt: data.updatedAt,
  };
};
