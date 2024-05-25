import React, { ComponentProps, FC } from "react";

interface EditButtonProps extends ComponentProps<"button"> {}

const EditButton: FC<EditButtonProps> = (props) => {
  return (
    <button className="font-Poppins text-primary underline" {...props}>
      Edit
    </button>
  );
};

export default EditButton;
