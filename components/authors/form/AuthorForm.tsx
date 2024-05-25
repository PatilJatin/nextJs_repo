"use client";

import React, { ChangeEvent, useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { AUTHOR_FORM_FIELDS } from "./AuthorFormProvider";
import PrimaryButton from "@/components/shared/buttons/PrimaryButton";
import SectionHeading from "@/components/properties/form/SectionHeading";
import { Input } from "@/components/formComponents/Input";
import MediaFileUploader from "@/components/formComponents/MediaFileUploader";
import { TextArea } from "@/components/formComponents/TextArea";
import { validateMediaFile } from "@/helpers/adminpanel/files/validateMediaFile";
import { extractUUID } from "@/helpers/adminpanel/files/extractUUID";
import {
  deleteImageFromAws,
  getPreSignedUrl,
  uploadFileToAws,
} from "@/services/aws/aws.services";
import { Toaster } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/redux/features/hook";
import {
  authorsSelector,
  createAuthorsAction,
  updateAuthorsAction,
} from "@/redux/features/adminpanel/authors/authors.slice";
import { useRouter } from "next/navigation";
import { preventNumberInputs } from "@/helpers/adminpanel/inputs/preventNumberInput";
import { capitalizeObjValues } from "@/helpers/adminpanel/inputs/capitalizeObjValues";
import InputError from "@/components/formComponents/InputError";
import dynamic from "next/dynamic";
import { IJoditEditorProps } from "jodit-react";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
const AuthorForm = ({
  id,
  variant,
}: {
  id: string;
  variant?: "edit" | "create";
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
    setError,
    getValues,
    setValue,
    trigger,
  } = useFormContext<AUTHOR_FORM_FIELDS>();

  const isEditForm = variant === "edit";

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(authorsSelector);

  const onFormSubmit = async (data: AUTHOR_FORM_FIELDS) => {
    const capitalized = capitalizeObjValues(data, ["image", "description"]);
    if (!isEditForm) {
      await dispatch(createAuthorsAction(capitalized));
      if (status === "succeeded") {
        router.push("/adminpanel/authors");
      }
    } else {
      await dispatch(updateAuthorsAction({ id: id, data: capitalized }));
      if (status === "succeeded") {
        router.push("/adminpanel/authors");
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
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <div className="mt-8">
        <SectionHeading sectionNo={1} title="Overview" />
      </div>

      <div className="grid grid-cols-2 gap-x-8 gap-y-6 mb-6">
        <div>
          <div className="mb-6">
            <Input
              id="authorName"
              label="Author Name"
              required
              onKeyDown={preventNumberInputs}
              placeholder="Enter name of author"
              {...register("name")}
              error={errors.name?.message}
            />
          </div>
          <div>
            <Controller
              control={control}
              name="imageInput"
              rules={{
                required: "Image is required",
              }}
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

        <div className="row-span-2">
          {/* <TextArea
            rows={11}
            id="authorDescription"
            {...register("description")}
            label="Author Description"
            placeholder="Type about author here"
            error={errors.description?.message}
            required
            helperText="250 characters max"
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
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <div className="inline-block">
          <PrimaryButton type="submit" disabled={!isValid}>
            {isEditForm ? "Edit Author" : "Add Author"}
          </PrimaryButton>
        </div>
      </div>
      <Toaster />
    </form>
  );
};

export default AuthorForm;
