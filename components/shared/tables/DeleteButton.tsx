import React, { ComponentProps, FC } from "react";

interface DeleteButtonProps extends ComponentProps<"button"> {}

const DeleteButton: FC<DeleteButtonProps> = (props) => {
  return (
    <button className="font-Poppins text-primary-red underline" {...props}>
      Delete
    </button>
  );
};

export default DeleteButton;
