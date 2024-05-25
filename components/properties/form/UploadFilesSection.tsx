import React, { ChangeEvent } from "react";
import SectionHeading from "./SectionHeading";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { PROPERTY_FORM_FIELDS } from "./PropertyFormProvider";
import PrimaryButton from "@/components/shared/buttons/PrimaryButton";
import SingleSelectInput from "@/components/formComponents/SelectInput";
import AttachmentInput from "@/components/formComponents/AttachmentInput";
import { validateMediaFile } from "@/helpers/adminpanel/files/validateMediaFile";
import { validateDocFile } from "@/helpers/adminpanel/files/validatePdfFile";
import { OPTION } from "@/types/common.types";
import {
  deleteImageFromAws,
  getPreSignedUrl,
  uploadFileToAws,
} from "@/services/aws/aws.services";
import { extractUUID } from "@/helpers/adminpanel/files/extractUUID";
import { FaTrash } from "react-icons/fa6";

const UploadFilesSection = () => {
  const {
    register,
    control,
    getValues,
    setValue,
    formState: { errors },
    watch,
    setError,
    trigger,
  } = useFormContext<PROPERTY_FORM_FIELDS>();

  const {
    fields: attachments,
    append,
    remove,
  } = useFieldArray<PROPERTY_FORM_FIELDS>({
    name: "attachments",
    control,
  });

  const categoryOptions: OPTION[] = [
    { value: "Floor Plan", label: "Floor Plan" },
    { value: "Investor Package", label: "Investor Package" },
    { value: "Price List", label: "Price List" },
    { value: "Site Plan", label: "Site Plan" },
    { value: "Incentives", label: "Incentives" },
    { value: "APS", label: "APS" },
  ];

  const handleMediaChange = async (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const isValidFile = validateDocFile(file, 5, ["application/pdf"]);
      if (isValidFile && !isValidFile.isValid) {
        setValue(`attachments.${index}.locationInput`, "");
        setError(`attachments.${index}.locationInput`, {
          message: isValidFile.message,
        });
      } else {
        if (getValues(`attachments.${index}.location`)) {
          await deleteImageFromAws(
            extractUUID(watch(`attachments.${index}.location`))
          );
        }
        const preSignedUrl = await getPreSignedUrl(file.name);
        await uploadFileToAws(preSignedUrl.uploadUrl, file);
        setValue(
          `attachments.${index}.location`,
          preSignedUrl.uploadUrl.split("?")[0]
        );
        trigger(`attachments.${index}.locationInput`);
      }
    }
  };

  console.log(watch());

  return (
    <>
      <SectionHeading sectionNo={5} title="Upload Files" />

      {attachments.map((field, index) => {
        const filteredOptions = categoryOptions.filter((option) => {
          const isSelected = watch("attachments")
            .slice(0, index)
            .some((attachment) => attachment.title.value === option.value); // Check if option is selected in any of the previous attachments
          return !isSelected;
        });

        return (
          <div key={field.id} className="grid grid-cols-3 gap-x-8 mb-3 ">
            <Controller
              rules={{
                shouldUnregister: true,
              }}
              control={control}
              name={`attachments.${index}.title`}
              render={({ field: { ...other } }) => (
                <SingleSelectInput
                  label="Add Category"
                  required
                  options={filteredOptions}
                  error={errors?.attachments?.[index]?.title?.value?.message}
                  {...other}
                />
              )}
            />

            <Controller
              name={`attachments.${index}.locationInput`}
              render={({ field: { onChange, ...other } }) => (
                <AttachmentInput
                  preview={watch(`attachments.${index}.location`)}
                  label="Attachment"
                  required
                  placeholder="Select a category"
                  error={errors?.attachments?.[index]?.location?.message}
                  onChange={(e) => {
                    onChange(e);
                    handleMediaChange(e, index);
                  }}
                  {...other}
                />
              )}
            />
            <div className="self-center ">
              <button
                onClick={() => remove(index)}
                className="bg-primary-red p-2 text-white rounded-lg"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        );
      })}

      <div
        className={`inline-block ${attachments.length >= 3 ? "hidden" : ""}`}
      >
        <PrimaryButton
          onClick={() =>
            append({
              title: { value: "", label: "" },
              location: "",
              locationInput: "",
            })
          }
          type="button"
        >
          Add More
        </PrimaryButton>
      </div>
    </>
  );
};

export default UploadFilesSection;
