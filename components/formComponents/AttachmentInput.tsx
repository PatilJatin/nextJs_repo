import React, { ComponentProps, forwardRef } from "react";
import InputLabel from "./InputLabel";
import InputError from "./InputError";
import Image from "next/image";
import { icons } from "@/public/assets/icons";

type AttachmentInputType = {
  label?: string;
  error?: string;
  preview?: string;
} & ComponentProps<"input">;

export const AttachmentInput = forwardRef<
  HTMLInputElement,
  AttachmentInputType
>(function AttachmentInput(
  { id, label, required, error, preview, ...props },
  ref
) {
  let fileName = "";
  if (typeof preview === "string") {
    fileName = preview.split("/").pop() ?? "";
  }
  console.log(fileName);
  return (
    <div>
      <div className="mb-3">
        <InputLabel>
          {label}
          {required ? "*" : null}
        </InputLabel>
      </div>

      <label htmlFor={id} className="relative">
        <input ref={ref} id={id} type="file" className="sr-only" {...props} />
        <div className="flex items-center gap-3 border border-tertiary rounded-[4px] px-3 py-3 text-sm outline-none focus:outline-none focus:border focus:border-black">
          <Image src={icons.attachment} height={24} width={24} alt="" />
          <span className="text-tertiary font-Poppins font-normal text-sm">
            {fileName ? fileName : "Click here to upload file"}
          </span>
        </div>
      </label>

      {error ? (
        <InputError>{error}</InputError>
      ) : (
        <div className="flex justify-between mt-2">
          <span className="text-tertiary font-Poppins font-normal text-sm">
            Maximum size: 5 MB
          </span>
        </div>
      )}
    </div>
  );
});

export default AttachmentInput;
