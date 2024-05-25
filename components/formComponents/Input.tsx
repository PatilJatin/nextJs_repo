import { ComponentProps, forwardRef } from "react";
import InputLabel from "./InputLabel";
import InputError from "./InputError";
// import { FieldError } from './Form'

interface InputProps extends ComponentProps<"input"> {
  label: string;
  error?: string;
  helperText?: string;
  capitalize?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    id,
    label,
    type = "text",
    error,
    required,
    helperText,
    capitalize,
    ...props
  },
  ref
) {
  const isEmailOrPassword =
    type === "email" || type === "password" || !capitalize;

  console.log(isEmailOrPassword);
  const today = new Date().toISOString().split("T")[0];
  console.log(today);

  return (
    <div className="w-full">
      <div className="w-full mb-3">
        <InputLabel id={id}>
          {label}
          {required ? "*" : ""}
        </InputLabel>
      </div>
      <div className="mb-1 w-full">
        <input
          id={id}
          className={`${
            isEmailOrPassword ? "normal-case" : "capitalize"
          } font-Poppins font-normal leading-[22.4px]  w-full border border-tertiary rounded-[4px] px-3 py-3 text-sm outline-none focus:outline-none focus:border focus:border-black`}
          type={type}
          ref={ref}
          min={type === "date" ? today : 0}
          {...props}
        />
        {helperText && (
          <p className="font-Poppins text-xs text-tertiary">{helperText}</p>
        )}
      </div>
      {error && <InputError>{error}</InputError>}
    </div>
  );
});
