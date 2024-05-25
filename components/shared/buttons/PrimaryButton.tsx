import React, { ComponentProps, FC, ReactNode } from "react";

interface PrimaryButtonProps extends ComponentProps<"button"> {
  children: ReactNode;
}

const PrimaryButton: FC<PrimaryButtonProps> = (btnProps) => {
  const { children, disabled, ...props } = btnProps;

  return (
    <button
      className={`${
        disabled ? "bg-[#ABABAB] cursor-default" : "bg-primary"
      } text-base w-full min-w-[7.5rem] py-3 px-5 font-Poppins font-medium rounded-[4px]  text-white`}
      // disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
