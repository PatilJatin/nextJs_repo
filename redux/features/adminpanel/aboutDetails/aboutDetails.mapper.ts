import {
  ABOUT_DETAILS_FIELDS,
  ABOUT_DETAILS_MODEL,
  ABOUT_DETAILS_RESPONSE,
} from "@/types/aboutDetails.types";

export const mapAboutDetailsResponseToModel = (
  data: ABOUT_DETAILS_RESPONSE
): ABOUT_DETAILS_MODEL => {
  return {
    _id: data._id,
    areaCovered: data.areaCovered,
    description: data.description,
    designation: data.designation,
    image: data.image,
    name: data.name,
    role: data.role,
    speciality: data.speciality,
  };
};

export const mapAboutDetailsModelToForm = (
  data: ABOUT_DETAILS_MODEL
): ABOUT_DETAILS_FIELDS => {
  return {
    areaCovered: data.areaCovered.join(", "),
    description: data.description,
    designation: data.designation,
    image: data.image,
    name: data.name,
    role: data.role,
    speciality: data.speciality.join(", "),
    imageInput: "",
  };
};
