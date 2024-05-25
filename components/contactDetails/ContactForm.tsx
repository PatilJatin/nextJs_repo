"use client";

import { CONTACT_DETAILS_FIELDS } from "@/types/contactDetails.types";
import React, { ChangeEvent } from "react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../formComponents/Input";
import MediaFileUploader from "../formComponents/MediaFileUploader";
import {
  deleteImageFromAws,
  getPreSignedUrl,
  uploadFileToAws,
} from "@/services/aws/aws.services";
import { validateMediaFile } from "@/helpers/adminpanel/files/validateMediaFile";
import { extractUUID } from "@/helpers/adminpanel/files/extractUUID";
import PrimaryButton from "../shared/buttons/PrimaryButton";
import { useAppDispatch, useAppSelector } from "@/redux/features/hook";
import {
  contactDetailsSelector,
  updateContactDetailsAction,
} from "@/redux/features/adminpanel/contactDetails/contact.slice";

const ContactForm = ({ editData }: { editData: CONTACT_DETAILS_FIELDS }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
    trigger,
    setError,
  } = useForm<CONTACT_DETAILS_FIELDS>({
    mode: "all",
    defaultValues: editData,
  });

  const dispatch = useAppDispatch();
  const { status } = useAppSelector(contactDetailsSelector);

  const onSubmit = (data: CONTACT_DETAILS_FIELDS) => {
    const { imageInput, ...other } = data;
    dispatch(updateContactDetailsAction(other));
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

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-x-8 gap-y-7">
        <Input
          id="contactEmail"
          label="Email"
          type="email"
          {...register("email", {
            required: "Email is Required",
          })}
          error={errors.email?.message}
          required
        />

        <Input
          id="contactAddress"
          label="Address"
          type="text"
          {...register("address", {
            required: "Address is Required",
          })}
          error={errors.address?.message}
          required
        />

        <Input
          id="phoneNumber"
          label="Phone Number"
          type="tel"
          {...register("phoneNumber", {
            required: "Phone Number is Required",
          })}
          error={errors.phoneNumber?.message}
          required
        />

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

export default ContactForm;
