import { icons } from "@/public/assets/icons";
import Image from "next/image";
import React, { ComponentProps, FC, Fragment, forwardRef } from "react";
import InputLabel from "./InputLabel";
import InputError from "./InputError";

type MediaFileUploaderProps = {
  error?: string;
  label?: string;
  preview?: string;
} & ComponentProps<"input">;

export const MediaFileUploader = forwardRef<
  HTMLInputElement,
  MediaFileUploaderProps
>(function MediaFileUploader(
  { id, error, required, label, preview, ...props },
  ref
) {
  return (
    <div>
      <div className="mb-3">
        <InputLabel htmlFor={id}>
          {label}
          {required ? "*" : null}
        </InputLabel>
      </div>

      <label htmlFor={id} className="relative">
        <input ref={ref} id={id} type="file" className="sr-only" {...props} />
        <div className="relative h-[165px] border-2 border-dashed bg-[#ECEDEE] border-tertiary rounded-lg flex flex-col gap-1 justify-center items-center">
          {preview ? (
            <div className="flex justify-center absolute inset-x-5 inset-y-1 ">
              {/* <button className="bg-red-500 absolute top-0 right-0 rounded-full p-3">
                X
              </button> */}
              <Image
                src={preview as string}
                height={300}
                width={250}
                alt="Preview"
              />
            </div>
          ) : (
            <Fragment>
              <Image
                src={icons.imgPlaceholder}
                height={40}
                width={40}
                alt="Placeholder"
              />
              <span className="text-tertiary font-Poppins font-normal text-sm">
                Click here to add images/videos
              </span>
            </Fragment>
          )}
        </div>
      </label>

      {error ? (
        <InputError>{error}</InputError>
      ) : (
        <div className="flex justify-between mt-2">
          <span className="text-tertiary font-Poppins font-normal text-sm">
            Maximum size: 5 MB
          </span>
          <span className="text-tertiary font-Poppins font-normal text-sm">
            SVG, PNG, JPG or MP4
          </span>
        </div>
      )}
    </div>
  );
});

export default MediaFileUploader;
