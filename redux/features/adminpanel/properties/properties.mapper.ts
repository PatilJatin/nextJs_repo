import { PROPERTY_FORM_FIELDS } from "@/components/properties/form/PropertyFormProvider";
import { PROJECT_MODEL, PROJECT_RESPONSE } from "@/types/properties.types";

export const mapProjectToModel = (data: PROJECT_RESPONSE): PROJECT_MODEL => {
  const model: PROJECT_MODEL = {
    _id: data._id,
    name: data.name,
    description: data.description,
    developerName: data.developerName,
    deposit: data.deposit,
    address: data.address,
    city: data.city,
    country: data.country,
    neighborhood: data.neighborhood,
    numberOfStoreys: data.numberOfStoreys,
    numberOfUnits: data.numberOfUnits,
    occupancyDate: data.occupancyDate,
    maintenanceFees: data.maintenanceFees,
    pricedFrom: data.pricedFrom,
    categories: data.categories,
    hashtags: data.hashtags,
    closingIn: data.closingIn,
    overViewImages: data.overViewImages,
    aboutProject: data.aboutProject,
    aboutImages: data.aboutImages,
    featuresAndFinishes: data.featuresAndFinishes,
    featureImages: data.featureImages,
    aboutDeveloper: data.aboutDeveloper,
    developerImages: data.developerImages,
    attachments: data.attachments,
    faqs: data.faqs,
    uploadedByAdmin: data.uploadedByAdmin,
    auditLogs: data.auditLogs,
    isSingleFamilyHomeProject: data.isSingleFamilyHomeProject,
    isUpcomingProject: data.isUpcomingProject,
    isLaunchedRecently: data.isLaunchedRecently,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    releaseDate: data.releaseDate,
    isHidden: data.isHidden,
  };

  return model;
};

export const mapProjectToProjectForm = (
  data: PROJECT_RESPONSE
): PROPERTY_FORM_FIELDS => {
  return {
    name: data.name,
    description: data.description,
    developerName: data.developerName,
    address: data.address,
    neighborhood: data.neighborhood,
    deposit: data.deposit,
    numberOfStoreys: data.numberOfStoreys,
    numberOfUnits: data.numberOfUnits,
    occupancyDate: data.occupancyDate,
    maintenanceFees: data.maintenanceFees,
    pricedFrom: data.pricedFrom,
    hashtags: data?.hashtags.map((item) => ({
      label: item,
      value: item,
    })),
    categories: data?.categories.map((item) => ({
      label: item,
      value: item,
    })),
    city: data.city,
    releaseDate: data.releaseDate,
    overViewImageInput: "",
    overViewImages: data.overViewImages,
    aboutProject: data.aboutProject,
    aboutImagesInput: "",
    aboutImages: data.aboutImages,
    featuresAndFinishes: data.featuresAndFinishes,
    featureImagesInput: "",
    featureImages: data.featureImages,
    aboutDeveloper: data.aboutDeveloper,
    developerImagesInput: "",
    developerImages: data.developerImages,
    attachments: data.attachments.map((item) => ({
      title: { value: item.title, label: item.title },
      location: item.location,
      locationInput: "",
    })),
    isHidden: data.isHidden,
  };
};
