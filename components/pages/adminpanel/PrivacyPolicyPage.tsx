"use client";

import React, { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import parse from "html-react-parser";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
import Header from "@/components/shared/header/Header";
import PrimaryButton from "@/components/shared/buttons/PrimaryButton";
import InputError from "@/components/formComponents/InputError";
import { IJoditEditorProps } from "jodit-react";
import { useAppDispatch, useAppSelector } from "@/redux/features/hook";
import {
  POLICY,
  getPrivacyPolicyAction,
  privacyPolicySelector,
  updatePrivacyPolicyAction,
} from "@/redux/features/adminpanel/privacyPolicy/privacy.slice";
import PrimarySpinner from "@/components/shared/loaders/PrimarySpinner";
import { useRouter } from "next/navigation";

const PrivacyPolicyPage = ({ policy }: { policy: POLICY }) => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(privacyPolicySelector);

  console.log(policy);

  const {
    control,
    watch,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    mode: "all",
    defaultValues: {
      policy: policy.content,
    },
  });

  const handleBlogChange = (data: any) => {
    // console.log(data);
  };

  const config: IJoditEditorProps["config"] = useMemo(
    () => ({
      readonly: false,
      statusbar: false,
      autoresize: true,
      placeholder: "Hello",
      cache: true,
    }),
    []
  );

  const onSubmit = async (data: any) => {
    await dispatch(updatePrivacyPolicyAction(data.policy));
    await dispatch(getPrivacyPolicyAction());
  };

  return (
    <>
      {status === "loading" ? (
        <div className="h-[50vh]">
          <PrimarySpinner />
        </div>
      ) : (
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="policy"
            control={control}
            rules={{ required: "Required" }}
            render={({ field: { onChange, ...other } }) => (
              <JoditEditor
                config={config}
                className=""
                onChange={(e) => {
                  onChange(e);
                  handleBlogChange(e);
                }}
                {...other}
              />
            )}
          />
          <InputError>{errors.policy?.message}</InputError>

          <div className="mt-10 flex justify-center">
            <div className="inline-block">
              <PrimaryButton type="submit">
                {isSubmitting ? "Updating..." : "Update"}
              </PrimaryButton>
            </div>
          </div>
        </form>
      )}
      <div className="mt-10">
        <p className="mb-5 font-Poppins font-medium text-lg">Preview</p>
        <div className="border border-tertiary rounded-lg p-4">
          {parse(watch("policy"))}
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;
