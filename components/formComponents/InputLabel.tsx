import React, { ComponentProps, FC, ReactNode } from "react";

interface LabelProps extends ComponentProps<"label"> {
  children: ReactNode;
}

const InputLabel: FC<LabelProps> = (labelProps) => {
  const { children, id, ...props } = labelProps;

  return (
    <label className="block text-sm font-normal" htmlFor={id} {...props}>
      {children}
    </label>
  );
};

export default InputLabel;
