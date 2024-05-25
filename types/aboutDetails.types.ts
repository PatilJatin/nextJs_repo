export type ABOUT_DETAILS_RESPONSE = {
  _id: string;
  name: string;
  role: string;
  designation: string;
  speciality: string[];
  areaCovered: string[];
  description: string;
  image: string;
};

export type ABOUT_DETAILS_MODEL = {
  _id: string;
  name: string;
  role: string;
  designation: string;
  speciality: string[];
  areaCovered: string[];
  description: string;
  image: string;
};

export type ABOUT_DETAILS_FIELDS = {
  name: string;
  role: string;
  designation: string;
  speciality: string;
  areaCovered: string;
  description: string;
  image: string;
  imageInput: string;
};
