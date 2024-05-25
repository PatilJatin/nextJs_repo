"use client";
import { invPropFormValidations } from "@/formValidations/investingProperties.validations";
import { INVESTINGINPROPERTY_FORM_FIELDS } from "@/types/investingInPropeties.types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import InvPropForm from "./InvPropForm";

type INVESTINGINPROPERTY_PROPS = {
  id?: string;
  editData?: INVESTINGINPROPERTY_FORM_FIELDS;
  variant?: "edit" | "create";
};

const InvPropFormProvider: FC<INVESTINGINPROPERTY_PROPS> = (props) => {
  const { id, editData, variant = "create" } = props;
  const defaultValues: INVESTINGINPROPERTY_FORM_FIELDS = {
    description: "",
    imageSrc: "",
    isImageRightSide: false,
    title: "",
    imageInput: "",
    _id: "",
  };
  const methods = useForm({
    mode: "all",
    defaultValues: editData || defaultValues,
    resolver: zodResolver(invPropFormValidations),
  });
  return (
    <>
      <FormProvider {...methods}>
        <InvPropForm id={id} variant={variant} />
      </FormProvider>
    </>
  );
};

export default InvPropFormProvider;
