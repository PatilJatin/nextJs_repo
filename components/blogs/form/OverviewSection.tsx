import SingleSelectInput from "@/components/formComponents/SelectInput";
import { extractUUID } from "@/helpers/adminpanel/files/extractUUID";
import { validateMediaFile } from "@/helpers/adminpanel/files/validateMediaFile";
import {
  deleteImageFromAws,
  getPreSignedUrl,
  uploadFileToAws,
} from "@/services/aws/aws.services";
import { BLOG_FORM_FIELDS } from "@/types/blogs.types";
import { Input } from "@/components/formComponents/Input";

import React, { ChangeEvent, useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import MediaFileUploader from "@/components/formComponents/MediaFileUploader";
import { TextArea } from "@/components/formComponents/TextArea";
import axios from "axios";

type Props = {};

function OverviewSection({}: Props) {
  const {
    register,
    control,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    setError,
    trigger,
  } = useFormContext<BLOG_FORM_FIELDS>();
  const [authorOptions, setAuthorOptions] = useState<any>([]);

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
        console.log(preSignedUrl.uploadUrl.split("?")[0]);

        trigger("bannerUrl");
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/v1/admins/authors`);
        console.log(response.data.data);

        const authorList = response?.data?.data.data;

        setAuthorOptions(
          authorList.map((author: any) => ({
            value: author._id,
            label: author.name,
          }))
        );
      } catch (error: any) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-7">
      <Input
        capitalize
        id="blogName"
        {...register("title")}
        label="Blog  Name"
        placeholder="Enter name of blog"
        required
        error={errors.title?.message}
      />

      <Controller
        rules={{
          shouldUnregister: true,
        }}
        control={control}
        name={`authorId`}
        render={({ field: { ...other } }) => (
          <SingleSelectInput
            id="podcastCategory"
            label="Section"
            required
            options={authorOptions}
            error={errors?.authorId?.message}
            {...other}
          />
        )}
      />
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
              console.log(e);

              handleMediaChange(e);
            }}
            error={errors.bannerUrl?.message}
            {...other}
          />
        )}
      />
      <TextArea
        id="blogContent"
        label="Description"
        {...register("description")}
        error={errors.description?.message}
        placeholder="Type about blog here"
        required
        helperText="250 characters max"
      />
    </div>
  );
}

export default OverviewSection;
