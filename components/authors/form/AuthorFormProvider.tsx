"use client";

import { authorFormSchema } from "@/formValidations/authorForm.validations";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import AuthorForm from "./AuthorForm";

export type AUTHOR_FORM_FIELDS = {
  name: string;
  description: string;
  image: string;
  imageInput: string;
};

const AuthorFormProvider = ({
  id,
  editData,
  variant = "create",
}: {
  id?: string;
  editData?: AUTHOR_FORM_FIELDS;
  variant?: "edit" | "create";
}) => {
  const defaultValues: AUTHOR_FORM_FIELDS = {
    description: "",
    image: "",
    name: "",
    imageInput: "",
  };

  const methods = useForm<AUTHOR_FORM_FIELDS>({
    mode: "all",
    defaultValues: editData || defaultValues,
    resolver: zodResolver(authorFormSchema),
  });

  return (
    <FormProvider {...methods}>
      <AuthorForm id={id ?? ""} variant={variant} />
    </FormProvider>
  );
};

export default AuthorFormProvider;
