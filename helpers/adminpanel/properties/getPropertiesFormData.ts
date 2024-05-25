import { PROPERTY_FORM_FIELDS } from "@/components/properties/form/PropertyFormProvider";
import { PROJECT_RESPONSE } from "@/types/properties.types";

export const getPropertiesFormData = (
  data: PROPERTY_FORM_FIELDS
): Partial<PROJECT_RESPONSE> => {
  const {
    aboutImagesInput,
    featureImagesInput,
    overViewImageInput,
    developerImagesInput,
    ...restData
  } = data;
  return {
    ...restData,
    // loginEmail: "neel.narwadkar@furation.tech",
    // overViewImages: ["https://source.unsplash.com/random"],
    // aboutImages: ["https://source.unsplash.com/random"],
    // featureImages: ["https://source.unsplash.com/random"],
    // developerImages: ["https://source.unsplash.com/random"],
    hashtags: restData.hashtags.map((tag) => tag.value),
    categories: restData.categories.map((item) => item.value),
    attachments: restData.attachments.map((item) => ({
      title: item.title.value,
      location:
        "https://www.learningcontainer.com/wp-content/uploads/2019/09/sample-pdf-download-10-mb.pdf" ||
        item.location,
    })),
  };
};
