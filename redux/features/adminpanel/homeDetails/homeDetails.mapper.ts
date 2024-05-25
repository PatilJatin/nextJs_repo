import {
  HOME_DETAILS_FIELDS,
  HOME_DETAILS_MODEL,
  HOME_DETAILS_RESPONSE,
} from "@/types/homeDetails.types";

export const mapHomeDetailsResponseToModel = (
  data: HOME_DETAILS_RESPONSE
): HOME_DETAILS_MODEL => {
  return {
    _id: data._id,
    heroSliderImages: data.heroSliderImages,
    navigationImages: data.navigationImages,
    socialLinks: data.socialLinks,
    featuredInSection: data.featuredInSection,
    footerDescription: data.footerDescription,
    homeAdvertise: data.homeAdvertise,
  };
};

export const mapHomeDetailsModelToForm = (
  data: HOME_DETAILS_MODEL
): HOME_DETAILS_FIELDS => {
  return {
    heroSliderImageInput: "",
    heroSliderImages: data.heroSliderImages,
    navigationImageInput: "",
    navigationImages: data.navigationImages,
    socialLinks: data.socialLinks,
    featuredInSection: data?.featuredInSection?.map((item) => ({
      ...item,
      featuredImgInput: "",
    })),
    footerDescription: data.footerDescription,
    homeAdvertise: data?.homeAdvertise?.map((item) => ({
      ...item,
      homeAdvertiseImgInput: "",
    })),
  };
};
