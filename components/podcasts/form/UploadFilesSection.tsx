import { extractUUID } from "@/helpers/adminpanel/files/extractUUID";
import { validateMediaFile } from "@/helpers/adminpanel/files/validateMediaFile";
import {
  deleteImageFromAws,
  getPreSignedUrl,
  uploadFileToAws,
} from "@/services/aws/aws.services";
import { PODCAST_FORM_FIELDS } from "@/types/podcast.types";
import { Input } from "@/components/formComponents/Input";
import React, { ChangeEvent } from "react";
import { Controller, useFormContext } from "react-hook-form";
import SectionHeading from "@/components/properties/form/SectionHeading";
import AttachmentInput from "@/components/formComponents/AttachmentInput";
import { validateDocFile } from "@/helpers/adminpanel/files/validatePdfFile";
import { validateAudioFile } from "@/helpers/adminpanel/files/validateAudioFile";

const UploadFilesSection = () => {
  const {
    register,
    control,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    setError,
    trigger,
  } = useFormContext<PODCAST_FORM_FIELDS>();

  const handleMediaChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const isValidFile = validateAudioFile(file, 5, ["audio/mpeg"]);
      if (isValidFile && !isValidFile.isValid) {
        setError("audioUrl", { message: isValidFile.message });
      } else {
        if (watch("audioUrl")) {
          await deleteImageFromAws(extractUUID(watch("audioUrl")));
        }
        const preSignedUrl = await getPreSignedUrl(file.name);
        await uploadFileToAws(preSignedUrl.uploadUrl, file);
        setValue("audioUrl", preSignedUrl.uploadUrl.split("?")[0]);
        trigger("audioUrl");
      }
    }
  };

  console.log(watch());

  return (
    <>
      <SectionHeading sectionNo={2} title="Upload Files" />
      <div className="grid grid-cols-2 gap-x-8 gap-y-7">
        <Input
          capitalize
          id="audioTitle"
          {...register("audioTitle")}
          label="Add Title"
          placeholder="Enter name of audio title"
          required
          error={errors.audioTitle?.message}
        />

        <Controller
          name="audioInput"
          render={({ field: { onChange, ...other } }) => (
            <AttachmentInput
              preview={watch(`audioUrl`)}
              label="Attachment"
              required
              placeholder="Select a category"
              error={errors?.audioUrl?.message}
              onChange={(e) => {
                onChange(e);
                handleMediaChange(e);
              }}
              {...other}
            />
          )}
        />
      </div>
    </>
  );
};

export default UploadFilesSection;
