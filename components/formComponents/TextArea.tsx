import { ComponentProps, forwardRef } from "react";
import InputLabel from "./InputLabel";
import InputError from "./InputError";
// import { FieldError } from './Form'

interface TextAreaProps extends ComponentProps<"textarea"> {
  label: string;
  error?: string;
  helperText?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea({ label, error, required, helperText, id, ...props }, ref) {
    return (
      <div className="w-full">
        <div className="w-full mb-3 ">
          <InputLabel htmlFor={id}>
            {label}
            {required ? "*" : ""}
          </InputLabel>
        </div>
        <textarea
          id={id}
          {...props}
          ref={ref}
          className="min-h-[165px]  font-Poppins font-normal leading-[22.4px]  w-full border border-tertiary rounded-[4px] px-3 py-3 text-sm outline-none focus:outline-none focus:border focus:border-black"
        ></textarea>

        {!error ? (
          <p className="font-Poppins font-normal text-sm text-tertiary">
            {helperText}
          </p>
        ) : (
          <InputError>{error}</InputError>
        )}
      </div>
    );
  }
);
