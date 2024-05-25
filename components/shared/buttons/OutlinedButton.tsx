import React, { ComponentProps, FC, ReactNode } from "react";

interface OutlinedButtonProps extends ComponentProps<"button"> {
  children: ReactNode;
  colorType?: "primary" | "red";
}

const OutlinedButton: FC<OutlinedButtonProps> = (btnProps) => {
  const { children, colorType = "primary", ...props } = btnProps;

  return (
    <button
      className={`w-full border ${
        colorType === "primary"
          ? "border-primary"
          : colorType === "red"
          ? "border-primary-red"
          : ""
      } py-3 px-4 font-Poppins text-base font-medium rounded-[6px] ${
        colorType === "primary"
          ? "text-primary"
          : colorType === "red"
          ? "text-primary-red"
          : ""
      } `}
      {...props}
    >
      {children}
    </button>
  );
};

export default OutlinedButton;
