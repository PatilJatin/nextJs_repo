"use client";
import { Input } from "@/components/formComponents/Input";
import { capitalizeObjValues } from "@/helpers/adminpanel/inputs/capitalizeObjValues";
import {
  addLeadAction,
  leadsSelector,
} from "@/redux/features/adminpanel/leads/leads.slice";
import { useAppDispatch, useAppSelector } from "@/redux/features/hook";
import { PROJECT_MODEL } from "@/types/properties.types";
import axios from "axios";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

type Props = {
  Project: PROJECT_MODEL;
};

type LeadFormFields = {
  firstName: string;
  lastName: string;
  mobileNumber: number;
  email: string;
  areYouRealtor: boolean;
};

const RequestFromInformation = (props: Props) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<Boolean>(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<LeadFormFields>({
    mode: "all",
  });
  const onSubmit = async (data: LeadFormFields) => {
    console.log(data);
    const subscribedUser = data.areYouRealtor;
    console.log(subscribedUser);

    setLoading(() => true);
    const payloadData = {
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.mobileNumber.toString(),
      query: `Project Name : ${
        props.Project.name
      } , Lead created at : ${new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " ")}`,
      sourceName: "projects",
      email: data.email,
    };

    // if (subscribedUser.toString() === "yes") {
    //   const res = await axios.post("/api/v1/projects/get-attachments", {
    //     projectId: props.Project._id,
    //     name: data.firstName + " " + data.lastName,
    //     email: data.email,
    //     phone: +data.mobileNumber,
    //   });
    //   console.log(res);
    // }
    // toast.success("Attachments successfully sent to " + data.email.toString());
    const res = await dispatch(addLeadAction(payloadData));
    console.log(res);
    setLoading(() => false);
    // reset();
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-between items-center gap-6 lg:gap-8"
      >
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10">
          <Input
            id="firstName"
            label="First Name"
            placeholder="Enter your first name"
            error={errors.firstName?.message}
            {...register("firstName", {
              required: "First Name is required",
            })}
          />
          <Input
            id="lastName"
            label="Last Name"
            placeholder="Enter your last name"
            error={errors.lastName?.message}
            {...register("lastName", {
              required: "Last Name is required",
            })}
          />
          <Input
            id="mobileNumber"
            label="Phone Number"
            placeholder="Enter 10 digits phone number"
            error={errors.mobileNumber?.message}
            {...register("mobileNumber", {
              required: "Mobile Number is required",
              pattern: {
                value: /^[0-9]{10}$/, // Regular expression to validate 10 digit mobile number
                message: "Invalid mobile number",
              },
            })}
            type="tel"
          />
          <Input
            autoComplete="off"
            id="userEmail"
            label="Email"
            type="email"
            placeholder="Enter your Email id"
            error={errors.email?.message}
            {...register("email", {
              required: "Email is required",
            })}
          />
          <div className="w-full flex flex-col gap-4">
            <p className="font-medium text-sm leading-5 lg:text-base">
              Are you a realtor?*
            </p>
            <div className="flex justify-start items-center gap-8 lg:gap-6 text-sm leading-5 lg:text-base">
              <label>
                <input
                  type="radio"
                  value="yes"
                  {...register("areYouRealtor", {
                    required: "Please select an option",
                  })}
                  className="mr-2"
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  value="no"
                  {...register("areYouRealtor", {
                    required: "Please select an option",
                  })}
                  className="mr-2"
                />
                No
              </label>
            </div>
            {errors.areYouRealtor && (
              <p className="text-red-500">{errors.areYouRealtor.message}</p>
            )}
          </div>
          <div className="hidden  md:block"></div>
        </div>
        <div className="w-full flex justify-center">
          <button type="submit" className="primary-button ">
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default RequestFromInformation;
