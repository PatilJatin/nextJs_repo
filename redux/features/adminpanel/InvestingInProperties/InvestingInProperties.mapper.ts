import {
  INVESTINGINPROPERTY_FORM_FIELDS,
  INVESTINGINPROPERTY_MODEL,
  INVESTINGINPROPERTY_RESPONSE,
} from "@/types/investingInPropeties.types";

export const mapInvestingInPropertiesToModel = (
  data: INVESTINGINPROPERTY_RESPONSE
): INVESTINGINPROPERTY_FORM_FIELDS => {
  const model: INVESTINGINPROPERTY_FORM_FIELDS = {
    _id: data._id,
    description: data.description,
    imageSrc: data.imageSrc,
    isImageRightSide: data.isImageRightSide,
    title: data.title,
    imageInput:""
  };
  return model;
};
