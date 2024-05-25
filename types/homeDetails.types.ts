type SOCIAL_LINK = {
  name: string;
  link: string;
};

type FEATURED_IN_SECTION = {
  imageSrc: string;
  sourceLink: string;
};

type HOME_ADVERTISE = {
  title: string;
  description: string;
  navigateTo: string;
  imageSrc: string;
  isImageOnRightSide: boolean;
  buttonText: string;
};
type featuredInSectionData = {
  imageSrc: string;
  sourceLink: string;
};
export type HOME_DETAILS_RESPONSE = {
  _id: string;
  heroSliderImages: string[];
  navigationImages: string[];
  socialLinks: SOCIAL_LINK[];
  homeAdvertise: HOME_ADVERTISE[];
  featuredInSection: FEATURED_IN_SECTION[];
  footerDescription: string;
};

export type HOME_DETAILS_MODEL = {
  _id: string;
  heroSliderImages: string[];
  navigationImages: string[];
  socialLinks: SOCIAL_LINK[];
  homeAdvertise: HOME_ADVERTISE[];
  featuredInSection: FEATURED_IN_SECTION[];
  footerDescription: string;
};

export type HOME_DETAILS_FIELDS = {
  heroSliderImages: string[];
  heroSliderImageInput: string;
  navigationImages: string[];
  navigationImageInput: string;
  socialLinks: SOCIAL_LINK[];
  featuredInSection: {
    featuredImgInput: string;
    imageSrc: string;
    sourceLink: string;
  }[];
  footerDescription: string;
  homeAdvertise: {
    title: string;
    description: string;
    navigateTo: string;
    imageSrc: string;
    homeAdvertiseImgInput: string;
    isImageOnRightSide: boolean;
    buttonText: string;
  }[];
};
