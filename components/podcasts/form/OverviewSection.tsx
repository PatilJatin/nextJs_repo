"use client";
import { Input } from "@/components/formComponents/Input";
import MediaFileUploader from "@/components/formComponents/MediaFileUploader";
import SingleSelectInput from "@/components/formComponents/SelectInput";
import { TextArea } from "@/components/formComponents/TextArea";
import { extractUUID } from "@/helpers/adminpanel/files/extractUUID";
import { validateMediaFile } from "@/helpers/adminpanel/files/validateMediaFile";
import {
  deleteImageFromAws,
  getPreSignedUrl,
  uploadFileToAws,
} from "@/services/aws/aws.services";
import { PODCAST_FORM_FIELDS } from "@/types/podcast.types";
import axios from "axios";
import React, { ChangeEvent, useEffect, useState, useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import InputError from "@/components/formComponents/InputError";
import dynamic from "next/dynamic";
import { IJoditEditorProps } from "jodit-react";
import parse from "html-react-parser";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const OverviewSection = () => {
  const {
    register,
    control,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    setError,
    trigger,
  } = useFormContext<PODCAST_FORM_FIELDS>();
  const [categoryOptions, setCategoryOptions] = useState<any>([]);

  const handleMediaChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const isValidFile = validateMediaFile(file, 5);
      if (isValidFile && !isValidFile.isValid) {
        setError("bannerUrl", { message: isValidFile.message });
      } else {
        if (watch("bannerUrl")) {
          await deleteImageFromAws(extractUUID(watch("bannerUrl")));
        }
        const preSignedUrl = await getPreSignedUrl(file.name);
        await uploadFileToAws(preSignedUrl.uploadUrl, file);
        setValue("bannerUrl", preSignedUrl.uploadUrl.split("?")[0]);
        trigger("bannerUrl");
      }
    }
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/v1/categories-and-hashtags`);
        console.log(response.data);

        const { podcastCategory } = response?.data?.data;

        setCategoryOptions(
          podcastCategory.map((category: any) => ({
            value: category,
            label: category,
          }))
        );
      } catch (error: any) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  console.log(errors);

  return (
    <>
      <div className="grid grid-cols-2 gap-x-8 gap-y-7">
        <Input
          capitalize
          id="podcastName"
          {...register("name")}
          label="Podcast Name"
          placeholder="Enter name of project"
          required
          error={errors.name?.message}
        />

        <Controller
          rules={{
            shouldUnregister: true,
          }}
          control={control}
          name={`category`}
          render={({ field: { ...other } }) => (
            <SingleSelectInput
              id="podcastCategory"
              label="Section"
              required
              options={categoryOptions}
              error={errors?.category?.value?.message}
              {...other}
            />
          )}
        />

        {/* <TextArea
          id="podcastContent"
          label="About"
          {...register("about")}
          error={errors.about?.message}
          placeholder="Type about podcast here"
          required
          helperText="250 characters max"
        /> */}

        <Controller
          control={control}
          name="bannerImgInput"
          rules={{
            required: "Image is required",
          }}
          render={({ field: { onChange, ...other } }) => (
            <MediaFileUploader
              id="bannerImage"
              label="Add image"
              required
              preview={watch("bannerUrl")}
              onChange={(e) => {
                // onChange(e);
                handleMediaChange(e);
              }}
              error={errors.bannerUrl?.message}
              {...other}
            />
          )}
        />
        <div className="col-span-2">
          <Controller
            name="about"
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
          <InputError>{errors.about?.message}</InputError>
        </div>
        <div className="mt-10 col-span-2">
          <p className="mb-5 font-Poppins font-medium text-lg">Preview</p>
          <div className="border border-tertiary rounded-lg p-4">
            {parse(watch("about"))}
          </div>
        </div>
      </div>
    </>
  );
};

export default OverviewSection;
