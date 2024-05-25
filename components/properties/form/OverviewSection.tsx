"use client";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { PROPERTY_FORM_FIELDS } from "./PropertyFormProvider";
import SectionHeading from "./SectionHeading";
import { Input } from "@/components/formComponents/Input";
import MediaFileUploader from "@/components/formComponents/MediaFileUploader";
import { validateMediaFile } from "@/helpers/adminpanel/files/validateMediaFile";

import InputLabel from "@/components/formComponents/InputLabel";
import MultiCreatableInput from "@/components/formComponents/MultiCreatableInput";
import {
  deleteImageFromAws,
  getPreSignedUrl,
  uploadFileToAws,
} from "@/services/aws/aws.services";
import { extractUUID } from "@/helpers/adminpanel/files/extractUUID";
import axios from "axios";
import InputError from "@/components/formComponents/InputError";
import dynamic from "next/dynamic";
import { IJoditEditorProps } from "jodit-react";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const OverviewSection = () => {
  const {
    control,
    watch,
    register,
    formState: { errors },
    setError,
    getValues,
    setValue,
    trigger,
    clearErrors,
  } = useFormContext<PROPERTY_FORM_FIELDS>();

  const [categoryOptions, setCategoryOptions] = useState<any>([]);
  const [hashtagOptions, setHashtagOptions] = useState<any>([]);
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
        setError("overViewImages", { message: isValidFile.message });
      } else {
        if (getValues("overViewImages")[0]) {
          await deleteImageFromAws(extractUUID(watch("overViewImages")?.[0]));
        }
        const preSignedUrl = await getPreSignedUrl(file.name);
        await uploadFileToAws(preSignedUrl.uploadUrl, file);
        setValue("overViewImages", [preSignedUrl.uploadUrl.split("?")[0]]);
        trigger("overViewImages");
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/v1/categories-and-hashtags`);
        console.log(response.data);

        const { propertyCategories, hashtags } = response?.data?.data;

        setCategoryOptions(
          propertyCategories.map((category: any) => ({
            value: category,
            label: category,
          }))
        );
        setHashtagOptions(
          hashtags.map((hashtag: any) => ({
            value: hashtag,
            label: hashtag,
          }))
        );
      } catch (error: any) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  console.log(watch());

  return (
    <div className="mt-8">
      <SectionHeading sectionNo={1} title="Overview" />

      <div className="grid grid-cols-2 gap-x-8 gap-y-6 mb-6">
        <Input
          id="condoName"
          label="Condo Name"
          {...register("name")}
          error={errors.name?.message}
          placeholder="Enter your condo name"
          required
        />

        {/* <Input
          id="description"
          label="Description"
          {...register("description")}
          error={errors.description?.message}
          placeholder="Enter your description"
          required
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

        <Input
          id="devName"
          label="Developer Name"
          {...register("developerName")}
          error={errors.developerName?.message}
          placeholder="Enter your developer name"
          required
        />

        <Input
          id="condoAddress"
          label="Address"
          {...register("address")}
          error={errors.address?.message}
          placeholder="Enter your address"
          required
        />
        <Input
          id="cityName"
          label="City"
          {...register("city")}
          error={errors.city?.message}
          placeholder="Enter your city name"
          required
        />

        <Input
          id="condoNeighborhood"
          label="Neighborhood"
          {...register("neighborhood")}
          error={errors.neighborhood?.message}
          placeholder="Enter neighborhood"
          required
        />

        <Input
          id="condoDeposit"
          label="Deposit"
          type="number"
          {...register("deposit", {
            valueAsNumber: true,
          })}
          error={errors.deposit?.message}
          placeholder="Enter deposit"
          required
        />

        <Input
          id="numOfStoreys"
          label="Number of Storeys"
          type="number"
          {...register("numberOfStoreys", {
            valueAsNumber: true,
          })}
          error={errors.numberOfStoreys?.message}
          placeholder="Enter number of storeys"
          required
        />

        <Input
          id="numOfUnits"
          label="Number of Units"
          type="number"
          {...register("numberOfUnits", {
            valueAsNumber: true,
          })}
          error={errors.numberOfUnits?.message}
          placeholder="Enter number of units"
          required
        />

        <Input
          id="occupancyDate"
          label="Enter Occupancy Date"
          type="date"
          {...register("occupancyDate")}
          error={errors.occupancyDate?.message}
          placeholder="Occupancy Date"
          required
        />

        <Input
          id="condoMaintenance"
          label="Maintenance Fees"
          type="number"
          {...register("maintenanceFees", {
            valueAsNumber: true,
          })}
          error={errors.maintenanceFees?.message}
          placeholder="Enter Maintenance Fees"
          required
        />

        <Input
          id="pricedFrom"
          type="number"
          label="Priced From"
          {...register("pricedFrom", { valueAsNumber: true })}
          error={errors.pricedFrom?.message}
          placeholder="Enter Price (eg. $50000 - $70000)"
          required
        />

        <Controller
          name="hashtags"
          control={control}
          render={({ field: { ...other } }) => (
            <MultiCreatableInput
              trigger={trigger}
              inputName="hashtags"
              setValue={setValue}
              getValues={getValues}
              label="Add Hashtags"
              required
              optionsArray={hashtagOptions}
              error={errors.hashtags?.message}
              {...other}
            />
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-8 mb-6">
        <div className="flex flex-col gap-y-6">
          <Controller
            name="categories"
            control={control}
            render={({ field: { ...other } }) => (
              <MultiCreatableInput
                trigger={trigger}
                inputName="categories"
                setValue={setValue}
                getValues={getValues}
                label="Add Categories"
                required
                optionsArray={categoryOptions}
                error={errors.categories?.message}
                {...other}
              />
            )}
          />

          <Input
            id="releaseDate"
            type="date"
            label="Release Date"
            {...register("releaseDate")}
            error={errors.releaseDate?.message}
            placeholder="Release Date"
            required
          />
        </div>

        <Controller
          control={control}
          name="overViewImageInput"
          rules={{
            required: "Image is required",
          }}
          render={({ field: { onChange, ...other } }) => (
            <MediaFileUploader
              label="Add image"
              required
              preview={watch("overViewImages.0")}
              onChange={(e) => {
                handleMediaChange(e);
              }}
              error={errors.overViewImages?.message}
              {...other}
            />
          )}
        />
      </div>

      {/* <div>
        <h3 className="font-Poppins font-medium text-sm leading-5 mb-6">
          This project falls under which section
        </h3>

        <div className="flex gap-3 mb-3">
          <input type="checkbox" id="lastWeek" />
          <label
            htmlFor="lastWeek"
            className="font-Poppins font-medium text-sm leading-5"
          >
            Projects launched in last week
          </label>
        </div>

        <div className="flex gap-3 mb-3">
          <input type="checkbox" id="upcoming" />
          <label
            htmlFor="upcoming"
            className="font-Poppins font-medium text-sm leading-5"
          >
            Upcoming project in next month
          </label>
        </div>
      </div> */}
    </div>
  );
};

export default OverviewSection;
