"use client";

import { Input } from "@/components/formComponents/Input";
import OutlinedButton from "@/components/shared/buttons/OutlinedButton";
import PrimaryButton from "@/components/shared/buttons/PrimaryButton";
import {
  createUserAction,
  updateUserAction,
  userSelector,
} from "@/redux/features/adminpanel/user/user.slice";
import { useAppDispatch, useAppSelector } from "@/redux/features/hook";
import { USER } from "@/types/user.types";
import React, { FC } from "react";
import { useForm } from "react-hook-form";

type UserFormFields = {
  name: string;
  email: string;
  password?: string;
};

type UserFormProps = {
  variant: "add" | "edit";
  closeForm: () => void;
  editId?: string;
  editData?: UserFormFields;
};

const UserForm: FC<UserFormProps> = (props) => {
  const { variant, closeForm, editData, editId } = props;

  const isEditForm = variant === "edit";

  const dispatch = useAppDispatch();
  const { status } = useAppSelector(userSelector);

  const defaultValues: UserFormFields = {
    email: "",
    name: "",
    password: "",
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UserFormFields>({
    mode: "all",
    defaultValues: editData || defaultValues,
  });

  const onSubmit = async (data: UserFormFields) => {
    console.log(isEditForm);

    if (isEditForm) {
      console.log(data);

      dispatch(updateUserAction({ id: editId!, data: data }));
      if (status === "succeeded") {
        closeForm();
      }
    }

    if (variant === "add") {
      dispatch(createUserAction(data));
      if (status === "succeeded") {
        closeForm();
      }
    }
  };

  return (
    <div className="px-16 pb-6">
      <h3 className="font-Poppins font-normal text-[1.7rem] mb-4">
        {isEditForm ? "Edit" : "Add"} Admin
      </h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col w-full gap-4 mb-6">
          <Input
            autoComplete="off"
            id="userName"
            label="Name*"
            placeholder="Name of business"
            error={errors.name?.message}
            {...register("name", {
              required: "Name is required",
            })}
          />

          <Input
            disabled={isEditForm}
            autoComplete="off"
            id="userEmail"
            label="Email"
            type="email"
            placeholder="michelle.rivera@example.com"
            error={errors.email?.message}
            {...register("email", {
              required: "Email is required",
            })}
          />

          {!isEditForm ? (
            <Input
              autoComplete="off"
              id="userPassword"
              label="Set Password"
              placeholder="Enter Password"
              type="password"
              error={errors.password?.message}
              {...register("password", {
                required: "Password is required",
                shouldUnregister: true,
              })}
            />
          ) : null}
        </div>
        <div className="mb-4">
          <PrimaryButton type="submit">
            {!isEditForm ? "Add" : "Edit"} Admin
          </PrimaryButton>
        </div>
        <OutlinedButton onClick={closeForm}>Cancel</OutlinedButton>
      </form>
    </div>
  );
};

export default UserForm;
