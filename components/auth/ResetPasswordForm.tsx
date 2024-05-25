"use client";

import Link from "next/link";
import React from "react";
import { Input } from "../formComponents/Input";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { navAssets } from "@/public/assets/navbar";
import {
  fetchSignInMethodsForEmail,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "@/Firebase/firebaseClient";
import toast, { Toaster } from "react-hot-toast";

type ResetForm = {
  email: string;
};

const ResetPasswordForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ResetForm>({
    mode: "all",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ResetForm) => {
    console.log(data);

    const resetPassword = async () => {
      await sendPasswordResetEmail(auth, data.email)
        .then(() => {
          toast.success(`Reset link sent to ${data.email}`);
        })
        .catch((err: any) => {
          console.log(err.message);
        });
    };

    try {
      resetPassword();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <div className="font-Poppins p-6 md:p-9 lg:11 rounded-2xl xl:p-14 w-[95%] sm:w-[80%] md:w-[60%] lg:w-[37%] border border-tertiary">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center mb-6 md:mb-8 lg:mb-12">
            <Image src={navAssets.logo} height={100} width={151} alt="Logo" />
          </div>

          <div>
            <h1 className="text-secondary  font-normal text-xl lg:text-2xl xl:text-3xl mb-7">
              Reset Password
            </h1>

            <div className="mb-10">
              <Input
                label="Registered email address"
                placeholder="Enter your registered email address"
                {...register("email", {
                  required: "Email is required",
                })}
                error={errors.email?.message}
              />
            </div>

            <div className="mb-4 w-[50%] mx-auto">
              <button type="submit" className="primary-button w-full">
                Send Reset Password link
              </button>
            </div>

            <div>
              <p className="leading-6 text-tertiary font-normal text-xs sm:text-sm lg:text-base">
                You will receive a reset password link on your mail id Didn’t
                receive link?{" "}
                <Link href={`$`}>
                  <span className="underline text-primary">Resend Link</span>
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
      <Toaster />
    </>
  );
};

export default ResetPasswordForm;
