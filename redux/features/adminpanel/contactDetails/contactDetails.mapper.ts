import {
  CONTACT_DETAILS_FIELDS,
  CONTACT_DETAILS_MODEL,
  CONTACT_DETAILS_RESPONSE,
} from "@/types/contactDetails.types";

export const mapContactToModel = (
  data: CONTACT_DETAILS_RESPONSE
): CONTACT_DETAILS_MODEL => {
  return {
    _id: data._id,
    address: data.address,
    createdAt: data.createdAt,
    email: data.email,
    image: data.image,
    phoneNumber: data.phoneNumber,
    updatedAt: data.updatedAt,
  };
};

export const mapContactModelToForm = (
  data: CONTACT_DETAILS_MODEL
): CONTACT_DETAILS_FIELDS => {
  return {
    address: data.address,
    email: data.email,
    image: data.image,
    phoneNumber: data.phoneNumber,
    imageInput: "",
  };
};
