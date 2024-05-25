"use client";

import React, { ChangeEvent, useMemo } from "react";
import SectionHeading from "./SectionHeading";
import { TextArea } from "@/components/formComponents/TextArea";
import { Controller, useFormContext } from "react-hook-form";
import { PROPERTY_FORM_FIELDS } from "./PropertyFormProvider";
import MediaFileUploader from "@/components/formComponents/MediaFileUploader";
import { validateMediaFile } from "@/helpers/adminpanel/files/validateMediaFile";
import {
  deleteImageFromAws,
  getPreSignedUrl,
  uploadFileToAws,
} from "@/services/aws/aws.services";
import { extractUUID } from "@/helpers/adminpanel/files/extractUUID";
import { IJoditEditorProps } from "jodit-react";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
import InputError from "@/components/formComponents/InputError";

const AboutCondoSection = () => {
  const {
    register,
    formState: { errors },
    control,
    setValue,
    getValues,
    watch,
    setError,
    trigger,
  } = useFormContext<PROPERTY_FORM_FIELDS>();

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
  const handleMediaChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const isValidFile = validateMediaFile(file, 5);
      if (isValidFile && !isValidFile.isValid) {
        setError("aboutImages", { message: isValidFile.message });
      } else {
        if (getValues("aboutImages")?.[0]) {
          await deleteImageFromAws(extractUUID(watch("aboutImages")?.[0]));
        }
        const preSignedUrl = await getPreSignedUrl(file.name);
        await uploadFileToAws(preSignedUrl.uploadUrl, file);
        setValue("aboutImages", [preSignedUrl.uploadUrl.split("?")[0]]);
        trigger("aboutImages");
      }
    }
  };

  return (
    <>
      <SectionHeading sectionNo={2} title="About Condo" />

      <div className="grid grid-cols-2 gap-x-8">
        {/* <TextArea
          label="About"
          {...register("aboutProject")}
          error={errors.aboutProject?.message}
          placeholder="Type about condo here"
          required
          helperText="250 characters max"
        /> */}
        <div>
          <Controller
            name="aboutProject"
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
          <InputError>{errors.aboutProject?.message}</InputError>
        </div>

        <Controller
          control={control}
          name="aboutImagesInput"
          rules={{
            required: "Image is required",
          }}
          render={({ field: { onChange, ...other } }) => (
            <MediaFileUploader
              label="Add image"
              required
              preview={watch("aboutImages.0")}
              onChange={(e) => {
                // onChange(e);
                handleMediaChange(e);
              }}
              error={errors.aboutImages?.message}
              {...other}
            />
          )}
        />
      </div>
    </>
  );
};

export default AboutCondoSection;
