"use client";
import { blogFormValidations } from "@/formValidations/blogFormValidation";
import { BLOG_FORM_FIELDS } from "@/types/blogs.types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import BlogForm from "./BlogForm";

type BLOG_PROPS = {
  id?: string;
  editData?: BLOG_FORM_FIELDS;
  variant?: "edit" | "create";
};

const BlogFormProvider: FC<BLOG_PROPS> = (props) => {
  const { id, editData, variant = "create" } = props;
  const defaultValues: BLOG_FORM_FIELDS = {
    authorId: {
      value: "",
      label: "",
    },
    bannerImgInput: "",
    bannerUrl: "",

    description: "",
    title: "",
    isRelatedToHowToScreen: false,
  };
  const methods = useForm({
    mode: "all",
    defaultValues: editData || defaultValues,
    resolver: zodResolver(blogFormValidations),
  });
  return (
    <>
      <FormProvider {...methods}>
        <BlogForm id={id} variant={variant} />
      </FormProvider>
    </>
  );
};
export default BlogFormProvider;
