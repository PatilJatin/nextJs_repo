"use client";

import React from "react";

import { Controller, FormProvider, useForm } from "react-hook-form";
import PropertyForm from "./PropertyForm";
import { ATTACHMENT, PROJECT_RESPONSE } from "@/types/properties.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { propertyFormSchema } from "@/formValidations/propertyForm";
import { OPTION } from "@/types/common.types";

export type PROPERTY_FORM_FIELDS = {
  name: string;
  description: string;
  developerName: string;
  address: string;
  neighborhood: string;
  deposit: number;
  numberOfStoreys: number;
  numberOfUnits: number;
  occupancyDate: string;
  maintenanceFees: number;
  pricedFrom: number;
  hashtags: OPTION[];
  categories: OPTION[];
  releaseDate: string;
  overViewImages: string[];
  overViewImageInput: string;
  city: string;
  aboutProject: string;
  aboutImages: string[];
  aboutImagesInput?: string;

  featuresAndFinishes: string;
  featureImages: string[];
  featureImagesInput: string;

  aboutDeveloper: string;
  developerImages: string[];
  developerImagesInput: string;

  attachments: {
    title: OPTION;
    location: string;
    locationInput: string;
  }[];
  isHidden: boolean;
};

const PropertyFormProvider = ({
  id,
  editData,
  variant = "create",
}: {
  id?: string;
  editData?: PROPERTY_FORM_FIELDS;
  variant?: "edit" | "create";
}) => {
  const defaultValues: PROPERTY_FORM_FIELDS = {
    name: "",
    description: "",
    developerName: "",
    address: "",
    neighborhood: "",
    deposit: 0,
    numberOfStoreys: 0,
    numberOfUnits: 0,
    occupancyDate: "",
    maintenanceFees: 0,
    pricedFrom: 0,
    hashtags: [],
    categories: [],
    releaseDate: "",
    overViewImageInput: "",
    overViewImages: [],
    city: "",
    aboutProject: "",
    aboutImages: [],
    aboutImagesInput: "",

    featuresAndFinishes: "",
    featureImages: [],
    featureImagesInput: "",

    aboutDeveloper: "",
    developerImages: [],
    developerImagesInput: "",

    attachments: [
      {
        title: { value: "", label: "" },
        location: "",
        locationInput: "",
      },
    ],
    isHidden: false,
  };

  const methods = useForm<PROPERTY_FORM_FIELDS>({
    mode: "all",
    defaultValues: editData || defaultValues,
    resolver: zodResolver(propertyFormSchema),
  });
  console.log(editData?.city);

  return (
    <>
      <FormProvider {...methods}>
        <PropertyForm id={id!} variant={variant} />
      </FormProvider>
    </>
  );
};

export default PropertyFormProvider;
