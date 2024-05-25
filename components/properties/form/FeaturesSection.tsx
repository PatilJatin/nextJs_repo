import React, { ChangeEvent, useMemo } from "react";
import SectionHeading from "./SectionHeading";
import { Controller, useFormContext } from "react-hook-form";
import { TextArea } from "@/components/formComponents/TextArea";
import InputLabel from "@/components/formComponents/InputLabel";
import MediaFileUploader from "@/components/formComponents/MediaFileUploader";
import { PROPERTY_FORM_FIELDS } from "./PropertyFormProvider";
import { validateMediaFile } from "@/helpers/adminpanel/files/validateMediaFile";
import {
  deleteImageFromAws,
  getPreSignedUrl,
  uploadFileToAws,
} from "@/services/aws/aws.services";
import { extractUUID } from "@/helpers/adminpanel/files/extractUUID";
import InputError from "@/components/formComponents/InputError";
import dynamic from "next/dynamic";
import { IJoditEditorProps } from "jodit-react";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
const FeaturesSection = () => {
  const {
    register,
    control,
    getValues,
    setValue,
    formState: { errors },
    setError,
    trigger,
    watch,
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
        setError("featureImages", { message: isValidFile.message });
      } else {
        if (getValues("featureImages")?.[0]) {
          await deleteImageFromAws(extractUUID(watch("featureImages")?.[0]));
        }
        const preSignedUrl = await getPreSignedUrl(file.name);
        await uploadFileToAws(preSignedUrl.uploadUrl, file);
        setValue("featureImages", [preSignedUrl.uploadUrl.split("?")[0]]);
        trigger("featureImages");
      }
    }
  };

  return (
    <>
      <SectionHeading sectionNo={3} title="Features & Finishes" />

      <div className="grid grid-cols-2 gap-x-8">
        {/* <TextArea
          label="Features & Finishes"
          {...register("featuresAndFinishes")}
          // error={errors.}
          placeholder="Type about features & finishes here"
          required
          helperText="250 characters max"
          error={errors.featuresAndFinishes?.message}
        /> */}
        <div>
          <Controller
            name="featuresAndFinishes"
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
          <InputError>{errors.featuresAndFinishes?.message}</InputError>
        </div>

        <Controller
          control={control}
          name="featureImagesInput"
          render={({ field: { onChange, ...other } }) => (
            <MediaFileUploader
              label="Add image"
              required
              preview={watch("featureImages.0")}
              onChange={(e) => {
                handleMediaChange(e);
              }}
              {...other}
              error={errors.featureImages?.message}
            />
          )}
        />
      </div>
    </>
  );
};

export default FeaturesSection;
