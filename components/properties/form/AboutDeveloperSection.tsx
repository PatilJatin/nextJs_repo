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
const AboutDeveloperSection = () => {
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

  const handleMediaChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const isValidFile = validateMediaFile(file, 5);
      if (isValidFile && !isValidFile.isValid) {
        setError("developerImages", { message: isValidFile.message });
      } else {
        if (getValues("developerImages")?.[0]) {
          await deleteImageFromAws(extractUUID(watch("developerImages")?.[0]));
        }
        const preSignedUrl = await getPreSignedUrl(file.name);
        await uploadFileToAws(preSignedUrl.uploadUrl, file);
        setValue("developerImages", [preSignedUrl.uploadUrl.split("?")[0]]);
        trigger("developerImages");
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

  return (
    <>
      <SectionHeading sectionNo={4} title="About Developer" />

      <div className="grid grid-cols-2 gap-x-8">
        {/* <TextArea
          label="About Developer"
          {...register("aboutDeveloper")}
          error={errors.aboutDeveloper?.message}
          placeholder="Type about developer here"
          required
          helperText="250 characters max"
        /> */}
        <div>
          <Controller
            name="aboutDeveloper"
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
          <InputError>{errors.aboutDeveloper?.message}</InputError>
        </div>

        <Controller
          control={control}
          name="developerImagesInput"
          render={({ field: { onChange, ...other } }) => (
            <MediaFileUploader
              label="Add image"
              required
              preview={watch("developerImages.0")}
              onChange={(e) => {
                handleMediaChange(e);
              }}
              error={errors.developerImages?.message}
              {...other}
            />
          )}
        />
      </div>
    </>
  );
};

export default AboutDeveloperSection;
