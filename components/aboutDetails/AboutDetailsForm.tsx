"use client";

import {
  aboutDetailsSelector,
  updateAboutDetailsAction,
} from "@/redux/features/adminpanel/aboutDetails/aboutDetails.slice";
import { useAppDispatch, useAppSelector } from "@/redux/features/hook";
import { ABOUT_DETAILS_FIELDS } from "@/types/aboutDetails.types";
import React, { ChangeEvent, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import PrimaryButton from "../shared/buttons/PrimaryButton";
import { Input } from "../formComponents/Input";
import MediaFileUploader from "../formComponents/MediaFileUploader";
import {
  deleteImageFromAws,
  getPreSignedUrl,
  uploadFileToAws,
} from "@/services/aws/aws.services";
import { extractUUID } from "@/helpers/adminpanel/files/extractUUID";
import { validateMediaFile } from "@/helpers/adminpanel/files/validateMediaFile";
import { TextArea } from "../formComponents/TextArea";
import InputError from "@/components/formComponents/InputError";
import dynamic from "next/dynamic";
import { IJoditEditorProps } from "jodit-react";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const AboutDetailsForm = ({ editData }: { editData: ABOUT_DETAILS_FIELDS }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
    trigger,
    setError,
  } = useForm<ABOUT_DETAILS_FIELDS>({
    mode: "all",
    defaultValues: editData,
  });
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
  console.log(editData);

  const dispatch = useAppDispatch();
  const { status } = useAppSelector(aboutDetailsSelector);

  const onSubmit = (data: ABOUT_DETAILS_FIELDS) => {
    const { imageInput, ...other } = data;
    const obj = {
      ...other,
      areaCovered: other.areaCovered.split(","),
      speciality: other.speciality.split(","),
    };
    console.log(obj);
    dispatch(updateAboutDetailsAction(obj));
  };

  const handleMediaChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const isValidFile = validateMediaFile(file, 5);
      if (isValidFile && !isValidFile.isValid) {
        setError("image", { message: isValidFile.message });
      } else {
        if (watch("image")) {
          await deleteImageFromAws(extractUUID(watch("image")));
        }
        const preSignedUrl = await getPreSignedUrl(file.name);
        await uploadFileToAws(preSignedUrl.uploadUrl, file);
        setValue("image", preSignedUrl.uploadUrl.split("?")[0]);
        trigger("image");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-x-8 gap-y-7">
        <Input
          id="aboutName"
          label="Name"
          type="text"
          {...register("name", {
            required: "Name is Required",
          })}
          error={errors.name?.message}
          required
        />

        <Input
          id="aboutRole"
          label="Role"
          type="text"
          {...register("role", {
            required: "Role is Required",
          })}
          error={errors.role?.message}
          required
        />

        <Input
          id="aboutDesignation"
          label="Designation"
          type="tel"
          {...register("designation", {
            required: "Designation is Required",
          })}
          error={errors.designation?.message}
          required
        />

        <Input
          id="aboutSpecialty"
          label="Specialty"
          type="tel"
          {...register("speciality", {
            required: "Specialty is Required",
          })}
          error={errors.speciality?.message}
          required
          helperText="Separate with commas(,)"
        />

        <Input
          id="aboutAreaCovered"
          label="Area Covered"
          type="tel"
          {...register("areaCovered", {
            required: "Area Covered is Required",
          })}
          error={errors.areaCovered?.message}
          required
          helperText="Separate with commas(,)"
        />
      </div>

      <div className="mt-7 grid grid-cols-2 gap-x-8 gap-y-7">
        {/* <TextArea
          label="Description"
          {...register("description", {
            required: "Description is required",
          })}
          error={errors.description?.message}
          placeholder="Type Description here"
          required
          helperText="1000 characters max"
        /> */}
        <div>
          <p>Description*</p>
          <Controller
            name="description"
            control={control}
            rules={{ required: "Required" }}
            render={({ field: { onChange, ...other } }) => (
              <JoditEditor
                config={config}
                className=""
                onChange={(e: any) => {
                  onChange(e);
                  // handleBlogChange(e);
                }}
                {...other}
              />
            )}
          />
          <InputError>{errors.description?.message}</InputError>
        </div>

        <div>
          <Controller
            control={control}
            name="imageInput"
            render={({ field: { onChange, ...other } }) => (
              <MediaFileUploader
                label="Add image"
                required
                preview={watch("image")}
                onChange={(e) => {
                  onChange(e);
                  handleMediaChange(e);
                }}
                error={errors.image?.message}
                {...other}
              />
            )}
          />
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <div className="inline-block">
          <PrimaryButton type="submit">Update</PrimaryButton>
        </div>
      </div>
    </form>
  );
};

export default AboutDetailsForm;
