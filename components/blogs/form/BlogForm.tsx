import SectionHeading from "@/components/properties/form/SectionHeading";
import PrimaryButton from "@/components/shared/buttons/PrimaryButton";
import { capitalizeObjValues } from "@/helpers/adminpanel/inputs/capitalizeObjValues";
import { useAppDispatch, useAppSelector } from "@/redux/features/hook";
import { BLOG_FORM_FIELDS } from "@/types/blogs.types";
import { useRouter } from "next/navigation";
import parse from "html-react-parser";

import React, { ChangeEvent, FC, useEffect, useMemo, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import OverviewSection from "./OverviewSection";
import { validateMediaFile } from "@/helpers/adminpanel/files/validateMediaFile";
import {
  deleteImageFromAws,
  getPreSignedUrl,
  uploadFileToAws,
} from "@/services/aws/aws.services";
import { extractUUID } from "@/helpers/adminpanel/files/extractUUID";
import axios from "axios";
import { Input } from "@/components/formComponents/Input";
import SingleSelectInput from "@/components/formComponents/SelectInput";
import MediaFileUploader from "@/components/formComponents/MediaFileUploader";
import { TextArea } from "@/components/formComponents/TextArea";
import {
  addBlogAction,
  blogSelector,
  updateBlogAction,
} from "@/redux/features/adminpanel/blog/blogs.slice";
import InputError from "@/components/formComponents/InputError";
import dynamic from "next/dynamic";
import { IJoditEditorProps } from "jodit-react";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

type PROPS = {
  id?: string;
  variant?: "edit" | "create";
};

const BlogForm: FC<PROPS> = (props) => {
  const { id, variant } = props;
  const isEditForm = variant === "edit" && id !== undefined;
  const {
    register,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
    setValue,
    setError,
    trigger,
  } = useFormContext<BLOG_FORM_FIELDS>();
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(blogSelector);
  const router = useRouter();

  const [authorOptions, setAuthorOptions] = useState<any>([]);
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
        setError("bannerUrl", { message: isValidFile.message });
      } else {
        if (watch("bannerUrl")) {
          await deleteImageFromAws(extractUUID(watch("bannerUrl")));
        }
        const preSignedUrl = await getPreSignedUrl(file.name);
        await uploadFileToAws(preSignedUrl.uploadUrl, file);
        setValue("bannerUrl", preSignedUrl.uploadUrl.split("?")[0]);
        trigger("bannerUrl");
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/v1/admins/authors`);
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
  const onSubmit = async (data: BLOG_FORM_FIELDS) => {
    console.log(data);
    if (!isEditForm) {
      dispatch(addBlogAction(data));
    } else {
      dispatch(updateBlogAction({ id, data }));
    }
    if (status === "succeeded") {
      router.push("/adminpanel/blogs");
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SectionHeading sectionNo={1} title="Overview" />
          <div className="grid grid-cols-2  gap-x-8 gap-y-7">
            <div className="col-span-1">
              <Input
                capitalize
                id="blogName"
                {...register("title")}
                label="Blog  Name"
                placeholder="Enter name of blog"
                required
                error={errors.title?.message}
              />
            </div>

            <div className="col-span-1">
              <Controller
                rules={{
                  shouldUnregister: true,
                }}
                control={control}
                name={`authorId`}
                render={({ field: { ...other } }) => (
                  <SingleSelectInput
                    id="podcastCategory"
                    label="Select Author Name"
                    required
                    options={authorOptions}
                    error={errors?.authorId?.value?.message}
                    {...other}
                  />
                )}
              />
            </div>
            <div className="col-span-1">
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
                      handleMediaChange(e);
                    }}
                    error={errors.bannerUrl?.message}
                    {...other}
                  />
                )}
              />
            </div>
            {/* <TextArea
              id="blogContent"
              label="Description"
              {...register("description")}
              error={errors.description?.message}
              placeholder="Type about blog here"
              required
              helperText="250 characters max"
            /> */}

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

          <div className="border-b border-tertiary my-8"></div>
          <div className="flex justify-center mt-8">
            <div className="inline-block">
              <PrimaryButton type="submit">
                {isSubmitting
                  ? "Submitting..."
                  : isEditForm
                  ? "Edit Blog"
                  : " Add Blog"}
              </PrimaryButton>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default BlogForm;
