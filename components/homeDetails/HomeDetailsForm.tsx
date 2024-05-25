"use client";

import React, { ChangeEvent, Fragment, useMemo } from "react";
import PrimaryButton from "../shared/buttons/PrimaryButton";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { HOME_DETAILS_FIELDS } from "@/types/homeDetails.types";
import { Input } from "../formComponents/Input";
import { validateMediaFile } from "@/helpers/adminpanel/files/validateMediaFile";
import { extractUUID } from "@/helpers/adminpanel/files/extractUUID";
import {
  deleteImageFromAws,
  getPreSignedUrl,
  uploadFileToAws,
} from "@/services/aws/aws.services";
import MediaFileUploader from "../formComponents/MediaFileUploader";
import Image from "next/image";
import InputLabel from "../formComponents/InputLabel";
import { zodResolver } from "@hookform/resolvers/zod";
import { homeDetailsFormSchema } from "@/formValidations/homeDetailsForm";
import InputError from "../formComponents/InputError";
import { FaTrash } from "react-icons/fa6";
import { useAppDispatch } from "@/redux/features/hook";
import { updateHomeDetailsAction } from "@/redux/features/adminpanel/homeDetails/homeDetails.slice";
import SectionHeading from "../properties/form/SectionHeading";
import { TextArea } from "../formComponents/TextArea";
// import InputError from "@/components/formComponents/InputError";
import dynamic from "next/dynamic";
import { IJoditEditorProps } from "jodit-react";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const HomeDetailsForm = ({ editData }: { editData: HOME_DETAILS_FIELDS }) => {
  const {
    setValue,
    getValues,
    trigger,
    watch,
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<HOME_DETAILS_FIELDS>({
    mode: "all",
    defaultValues: editData,
    resolver: zodResolver(homeDetailsFormSchema),
  });
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
  const {
    fields: socialLinksFields,
    append,
    remove,
  } = useFieldArray({
    name: "socialLinks",
    control: control,
  });

  const {
    fields: featuredInSections,
    append: featuredAppend,
    remove: featuredRemove,
  } = useFieldArray({
    name: "featuredInSection",
    control: control,
  });

  const {
    fields: homeAdvertiseSections,
    append: homeAdvertiseAppend,
    remove: homeAdvertiseRemove,
  } = useFieldArray({
    name: "homeAdvertise",
    control: control,
  });

  const dispatch = useAppDispatch();

  const handleMediaChange = async (
    e: ChangeEvent<HTMLInputElement>,
    inputName: any,
    fieldName: any
  ) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const isValidFile = validateMediaFile(file, 5);
      if (isValidFile && !isValidFile.isValid) {
        setError(inputName, { message: isValidFile.message });
      } else {
        // if (getValues("heroSliderImages")[0]) {
        //   await deleteImageFromAws(extractUUID(watch("heroSliderImages")?.[0]));
        // }
        const existingImages = getValues(fieldName);
        const preSignedUrl = await getPreSignedUrl(file.name);
        await uploadFileToAws(preSignedUrl.uploadUrl, file);
        setValue(fieldName, [
          ...existingImages,
          preSignedUrl.uploadUrl.split("?")[0],
        ]);
        trigger(fieldName);
      }
    }
  };

  const handleDeleteImage = async (img: string, name: any, index: number) => {
    const imgUUID = extractUUID(img);
    await deleteImageFromAws(imgUUID);
    const newStrings = getValues(name); // Create a copy of the original array
    newStrings.splice(index, 1); // Remove the string at the specified index
    setValue(name, newStrings);
  };

  const onFormSubmit = async (data: HOME_DETAILS_FIELDS) => {
    await dispatch(updateHomeDetailsAction(data));
  };

  const handleSingleMediaChange = async (
    e: ChangeEvent<HTMLInputElement>,
    inputName: any,
    fieldName: any
  ) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const isValidFile = validateMediaFile(file, 5);
      console.log(file);
      if (isValidFile && !isValidFile.isValid) {
        setError(inputName, { message: isValidFile.message });
      } else {
        const preSignedUrl = await getPreSignedUrl(file.name);
        await uploadFileToAws(preSignedUrl.uploadUrl, file);
        setValue(fieldName, preSignedUrl.uploadUrl.split("?")[0]);
        trigger(fieldName);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <SectionHeading sectionNo={1} title="Hero Images" />

        {/* SECTION 1 HERO IMAGES */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-7 mb-5">
          <Controller
            control={control}
            name="heroSliderImageInput"
            rules={{
              required: "Image is required",
            }}
            render={({ field: { onChange, ...other } }) => (
              <MediaFileUploader
                label="Add Slider Image"
                required
                onChange={(e) => {
                  handleMediaChange(
                    e,
                    "heroSliderImageInput",
                    "heroSliderImages"
                  );
                }}
                error={errors.heroSliderImageInput?.message}
                {...other}
              />
            )}
          />

          <div className="border overflow-y-auto">
            <InputLabel>Preview</InputLabel>
            <div className="grid grid-cols-3 mt-3 gap-4">
              {watch("heroSliderImages").map((item, index) => (
                <div className="relative" key={index}>
                  <button
                    type="button"
                    onClick={() =>
                      handleDeleteImage(item, "heroSliderImages", index)
                    }
                    className="absolute -top-3 right-0 text-blue-400 font-bold"
                  >
                    X
                  </button>
                  <Image
                    src={item}
                    height={300}
                    width={300}
                    alt={`image${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <Controller
            control={control}
            name="navigationImageInput"
            rules={{
              required: "Image is required",
            }}
            render={({ field: { onChange, ...other } }) => (
              <MediaFileUploader
                label="Add Navigation Image"
                required
                onChange={(e) => {
                  handleMediaChange(
                    e,
                    "navigationImageInput",
                    "navigationImages"
                  );
                }}
                error={errors.navigationImages?.message}
                {...other}
              />
            )}
          />

          <div className="border overflow-y-auto">
            <InputLabel>Preview</InputLabel>
            <div className="grid grid-cols-3 mt-3 gap-4 h-full">
              {watch("navigationImages").map((item, index) => (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      handleDeleteImage(item, "navigationImages", index)
                    }
                    className="absolute -top-3 right-0 text-blue-400 font-bold"
                  >
                    X
                  </button>
                  <Image
                    src={item}
                    height={300}
                    width={300}
                    alt={`image${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-b border-tertiary my-7"></div>

        <SectionHeading sectionNo={2} title="Advertisement Section" />
        {/* ADVERTISEMENT SECTION */}
        <div>
          {homeAdvertiseSections.map((field, index) => (
            <div key={index} className="border-b border-gray-400 py-4">
              <h3 className="font-semibold font-Poppins text-base mb-3">
                Advertisement Section {index + 1}
              </h3>
              <div key={index} className="flex w-full gap-3">
                <div className="grid grid-cols-2 gap-x-8 gap-y-7 mb-3 w-full">
                  <Input
                    {...register(`homeAdvertise.${index}.title`)}
                    label="Title"
                    error={errors?.homeAdvertise?.[index]?.title?.message}
                  />

                  <Input
                    {...register(`homeAdvertise.${index}.navigateTo`)}
                    label="Link"
                    error={errors?.homeAdvertise?.[index]?.navigateTo?.message}
                  />

                  {/* <Controller
                    control={control}
                    name={`homeAdvertise.${index}.description`}
                    render={({ field }) => (
                      <TextArea
                        label="Description"
                        {...field}
                        error={
                          errors?.homeAdvertise?.[index]?.description?.message
                        }
                      />
                    )}
                  /> */}
                  <div>
                    <p>Description*</p>
                    <Controller
                      name={`homeAdvertise.${index}.description`}
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
                    <InputError>
                      {errors.homeAdvertise?.[index]?.description?.message}
                    </InputError>
                  </div>

                  <Controller
                    control={control}
                    name={`homeAdvertise.${index}.homeAdvertiseImgInput`}
                    rules={{
                      required: "Image is required",
                    }}
                    render={({ field: { onChange, ...other } }) => (
                      <MediaFileUploader
                        preview={watch(`homeAdvertise.${index}.imageSrc`)}
                        label="Add Advertisement Image"
                        required
                        onChange={(e) => {
                          handleSingleMediaChange(
                            e,
                            `homeAdvertise.${index}.homeAdvertiseImgInput`,
                            `homeAdvertise.${index}.imageSrc`
                          );
                        }}
                        error={
                          errors?.homeAdvertise?.[index]?.homeAdvertiseImgInput
                            ?.message ||
                          errors?.homeAdvertise?.[index]?.imageSrc?.message
                        }
                        {...other}
                      />
                    )}
                  />

                  <Input
                    {...register(`homeAdvertise.${index}.buttonText`)}
                    label="Button Text"
                    error={errors?.homeAdvertise?.[index]?.buttonText?.message}
                  />

                  <div className="flex items-center mt-5 gap-2">
                    <input
                      type="checkbox"
                      id="isImageOnRightSide"
                      className="h-5 w-5"
                      {...register(`homeAdvertise.${index}.isImageOnRightSide`)}
                    />
                    <label htmlFor="isImageOnRightSide">
                      Image must be on the right side
                    </label>
                  </div>
                </div>
              </div>
              <div className="self-center mb-6">
                <button
                  onClick={() => homeAdvertiseRemove(index)}
                  className="bg-primary-red p-2 text-white rounded"
                >
                  Remove Section
                </button>
              </div>
            </div>
          ))}

          <div className="inline-block py-4">
            <PrimaryButton
              type="button"
              onClick={() =>
                homeAdvertiseAppend({
                  buttonText: "",
                  description: "",
                  homeAdvertiseImgInput: "",
                  imageSrc: "",
                  isImageOnRightSide: false,
                  navigateTo: "",
                  title: "",
                })
              }
            >
              Add Section
            </PrimaryButton>
          </div>
        </div>

        <div className="border-b border-tertiary my-7"></div>

        <SectionHeading sectionNo={3} title="Featured In Section" />

        {/* FEATURED IN SECTION */}
        <div className="">
          {featuredInSections.map((field, index) => (
            <div key={index} className="flex w-full gap-3">
              <div className="grid grid-cols-2 gap-x-8 gap-y-7 mb-3 w-full">
                <Input
                  {...register(`featuredInSection.${index}.sourceLink`)}
                  label="Link"
                  error={
                    errors?.featuredInSection?.[index]?.sourceLink?.message
                  }
                />

                <Controller
                  control={control}
                  name={`featuredInSection.${index}.featuredImgInput`}
                  rules={{
                    required: "Image is required",
                  }}
                  render={({ field: { onChange, ...other } }) => (
                    <MediaFileUploader
                      preview={watch(`featuredInSection.${index}.imageSrc`)}
                      label="Add Feature Image"
                      required
                      onChange={(e) => {
                        handleSingleMediaChange(
                          e,
                          `featuredInSection.${index}.featuredImgInput`,
                          `featuredInSection.${index}.imageSrc`
                        );
                      }}
                      error={
                        errors?.featuredInSection?.[index]?.featuredImgInput
                          ?.message ||
                        errors?.featuredInSection?.[index]?.imageSrc?.message
                      }
                      {...other}
                    />
                  )}
                />
              </div>
              <div className="self-center ">
                <button
                  onClick={() => featuredRemove(index)}
                  className="bg-primary-red p-2 text-white rounded-lg"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}

          {featuredInSections.length < 4 ? (
            <div className="inline-block">
              <PrimaryButton
                onClick={() =>
                  featuredAppend({
                    featuredImgInput: "",
                    imageSrc: "",
                    sourceLink: "",
                  })
                }
              >
                Add More
              </PrimaryButton>
            </div>
          ) : null}

          <div className="block">
            <InputError>{errors.socialLinks?.message}</InputError>
          </div>
        </div>

        <div className="border-b border-tertiary my-7"></div>

        <SectionHeading sectionNo={4} title="Footer Details" />
        {/* SECTION 3 FOOTER DETAILS */}

        {/* <div>
          <Controller
            name="footerDescription"
            control={control}
            render={({ field }) => (
              <TextArea
                label="Footer Description"
                error={errors.footerDescription?.message}
                placeholder="Type Footer Description here"
                required
                helperText="1000 characters max"
                {...field}
              />
            )}
          />
        </div> */}
        <div>
          <p>Footer Description*</p>
          <Controller
            name="footerDescription"
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
          <InputError>{errors.footerDescription?.message}</InputError>
        </div>

        <div className="mt-8">
          {socialLinksFields.map((field, index) => (
            <div key={index} className="flex w-full gap-3">
              <div className="grid grid-cols-2 gap-x-8 gap-y-7 mb-3 w-full">
                <Input
                  {...register(`socialLinks.${index}.name`)}
                  label="Name"
                  error={errors?.socialLinks?.[index]?.name?.message}
                />

                <Input
                  capitalize={false}
                  {...register(`socialLinks.${index}.link`)}
                  label="Link"
                  error={errors?.socialLinks?.[index]?.link?.message}
                />
              </div>
              <div className="self-center ">
                <button
                  onClick={() => remove(index)}
                  className="bg-primary-red p-2 text-white rounded-lg"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
          <div className="block">
            <InputError>{errors.socialLinks?.message}</InputError>
          </div>

          <div className="inline-block">
            <PrimaryButton onClick={() => append({ name: "", link: "" })}>
              Add More
            </PrimaryButton>
          </div>
        </div>

        <div className="flex justify-center mt-7">
          <div className="inline-block">
            <PrimaryButton>
              {isSubmitting ? "Updating" : "Update"}
            </PrimaryButton>
          </div>
        </div>
      </form>
    </>
  );
};

export default HomeDetailsForm;
