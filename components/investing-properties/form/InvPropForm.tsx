import SectionHeading from "@/components/properties/form/SectionHeading";
import PrimaryButton from "@/components/shared/buttons/PrimaryButton";
import { capitalizeObjValues } from "@/helpers/adminpanel/inputs/capitalizeObjValues";
import { getInvPropsData } from "@/helpers/adminpanel/invProps/getInvPropData";
import {
  addInvestingInPropertiesAction,
  investingInPropertiesSelector,
  updateInvestingInPropertiesAction,
} from "@/redux/features/adminpanel/InvestingInProperties/InvestingInProperties.slice";
import { useAppDispatch, useAppSelector } from "@/redux/features/hook";
import { INVESTINGINPROPERTY_FORM_FIELDS } from "@/types/investingInPropeties.types";
import { useRouter } from "next/navigation";
import { FC } from "react";
import React, { ChangeEvent, useEffect, useState, useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import InputError from "@/components/formComponents/InputError";
import dynamic from "next/dynamic";
import { IJoditEditorProps } from "jodit-react";
import parse from "html-react-parser";
import { Input } from "@/components/formComponents/Input";
import MediaFileUploader from "@/components/formComponents/MediaFileUploader";
import { validateMediaFile } from "@/helpers/adminpanel/files/validateMediaFile";
import {
  deleteImageFromAws,
  getPreSignedUrl,
  uploadFileToAws,
} from "@/services/aws/aws.services";
import { extractUUID } from "@/helpers/adminpanel/files/extractUUID";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

type PROPS = {
  id?: string;
  variant?: "edit" | "create";
};

const InvPropForm: FC<PROPS> = (props) => {
  const { id, variant } = props;
  const isEditForm = variant === "edit" && id !== undefined;
  const {
    register,
    control,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    setError,
    trigger,
    handleSubmit,
  } = useFormContext<INVESTINGINPROPERTY_FORM_FIELDS>();
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(investingInPropertiesSelector);
  const router = useRouter();
  const onSubmit = async (data: INVESTINGINPROPERTY_FORM_FIELDS) => {
    // const capitalized = capitalizeObjValues(getInvPropsData(data), ["title"]);
    if (!isEditForm) {
      dispatch(addInvestingInPropertiesAction(data));
      if (status === "succeeded") {
        router.push("/adminpanel/investing-properties");
      }
    } else {
      console.log(data);
      dispatch(updateInvestingInPropertiesAction({ id, data: data }));
      if (status === "succeeded") {
        router.push("/adminpanel/investing-properties");
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
  console.log(errors);
  const handleMediaChange = async (e: any) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const isValidFile = validateMediaFile(file, 5);
      if (isValidFile && !isValidFile.isValid) {
        setError("imageSrc", { message: isValidFile.message });
      } else {
        if (watch("imageSrc")) {
          await deleteImageFromAws(extractUUID(watch("imageSrc")));
        }
        const preSignedUrl = await getPreSignedUrl(file.name);
        await uploadFileToAws(preSignedUrl.uploadUrl, file);
        setValue("imageSrc", preSignedUrl?.uploadUrl?.split("?")[0]);
        trigger("imageSrc");
      }
    }
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SectionHeading sectionNo={1} title="Overview" />
          <div className="grid grid-cols-2 gap-x-8 gap-y-7">
            <Input
              capitalize
              id="Title"
              {...register("title")}
              label="Investing Property Title"
              placeholder="Enter name of Title"
              error={errors.title?.message}
            />
            <Controller
              control={control}
              name="imageInput"
              rules={{
                required: "Image is required",
              }}
              render={({ field: { onChange, ...other } }) => (
                <MediaFileUploader
                  id="bannerImage"
                  label="Add image"
                  preview={watch("imageSrc")}
                  onChange={(e) => {
                    // onChange(e);
                    handleMediaChange(e);
                  }}
                  error={errors.imageSrc?.message}
                  {...other}
                />
              )}
            />
            <div className="flex items-center mt-5 gap-2">
              <input
                type="checkbox"
                id="isImageOnRightSide"
                className="h-5 w-5"
                {...register(`isImageRightSide`)}
              />
              <label htmlFor="isImageOnRightSide">
                Image must be on the right side
              </label>
            </div>
            <div className="col-span-2">
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
            <div className="mt-10 col-span-2">
              <p className="mb-5 font-Poppins font-medium text-lg">Preview</p>
              <div className="border border-tertiary rounded-lg p-4">
                {parse(watch("description"))}
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <div className="inline-block">
              <PrimaryButton type="submit">
                {isSubmitting
                  ? "Submitting..."
                  : isEditForm
                  ? "Edit Investing Property"
                  : " Add Investing Property"}
              </PrimaryButton>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default InvPropForm;
