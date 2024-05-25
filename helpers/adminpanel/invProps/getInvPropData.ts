import {
  INVESTINGINPROPERTY_FORM_FIELDS,
  INVESTINGINPROPERTY_RESPONSE,
} from "@/types/investingInPropeties.types";

export const getInvPropsData = (
  data: INVESTINGINPROPERTY_FORM_FIELDS
): Partial<INVESTINGINPROPERTY_RESPONSE> => {
  return {
    description: data.description,
    imageSrc: data.imageSrc,
    isImageRightSide: data.isImageRightSide,
    title: data.title,
  };
};
