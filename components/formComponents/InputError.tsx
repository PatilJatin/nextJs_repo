import React, { FC, ReactNode } from "react";

type ErrorProps = {
  children: ReactNode;
};

const InputError: FC<ErrorProps> = (errorProps) => {
  const { children } = errorProps;
  return <span className="text-sm text-red-500">{children}</span>;
};

export default InputError;
