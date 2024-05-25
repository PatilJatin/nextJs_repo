import { PROPERTY_FORM_FIELDS } from "@/components/properties/form/PropertyFormProvider";

export const editProperty: PROPERTY_FORM_FIELDS = {
  name: "Test1",
  description: "Test1",
  developerName: "Test1",
  address: "test1",
  neighborhood: "test1",
  deposit: 100,
  numberOfStoreys: 100,
  numberOfUnits: 100,
  occupancyDate: "2024-05-10",
  maintenanceFees: 100,
  pricedFrom: 100,
  city: "test1",
  hashtags: [{ value: "test1", label: "test1" }],
  categories: [{ value: "test1", label: "test1" }],
  releaseDate: "2024-05-10",
  overViewImageInput: "",
  overViewImages: [" https://source.unsplash.com/random"],
  aboutProject: "test1",
  aboutImagesInput: "",
  aboutImages: [" https://source.unsplash.com/random"],
  featuresAndFinishes: "test1",
  featureImagesInput: "",
  featureImages: [" https://source.unsplash.com/random"],
  aboutDeveloper: "test1",
  developerImagesInput: "",
  developerImages: [" https://source.unsplash.com/random"],
  attachments: [
    {
      title: { value: "Floor Plan", label: "Floor Plan" },
      location:
        "https://www.learningcontainer.com/wp-content/uploads/2019/09/sample-pdf-download-10-mb.pdf",
      locationInput: "",
    },
  ],
  isHidden: false,
};
