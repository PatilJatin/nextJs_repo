"use client";
import React, { useState } from "react";
import { Input } from "../formComponents/Input";
import Image from "next/image";
import { navAssets } from "@/public/assets/navbar";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { getSession, signIn } from "next-auth/react";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import PrimaryButton from "../shared/buttons/PrimaryButton";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
type LoginForm = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const router = useRouter();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<LoginForm>({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onLogin = async (data: LoginForm) => {
    try {
      console.log("called");
      const response = await axios.post("/api/v1/admins/by-email", {
        email: data.email,
      });
      console.log(response);
      if (!response.data.data.isActive) {
        toast.error("Your account is not active");
        return;
      }
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      console.log(res);

      if (res?.error) {
        toast.error("Invalid Credentials");
      } else {
        const getsession = await getSession();
        if (getsession?.user.isSuperAdmin) {
          router.replace("/adminpanel/admins");
        } else {
          router.replace("/adminpanel/properties");
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="font-Poppins p-6 md:p-9 lg:11 rounded-2xl xl:p-14 w-[95%] sm:w-[80%] md:w-[60%] lg:w-[37%] border border-tertiary">
        <form onSubmit={handleSubmit(onLogin)}>
          <div className="flex justify-center mb-6 md:mb-8 lg:mb-12 xl:mb-16">
            <Image src={navAssets.logo} height={100} width={151} alt="Logo" />
          </div>

          <div>
            <h1 className="text-secondary font-normal text-xl lg:text-2xl xl:text-3xl mb-8">
              Welcome!
            </h1>

            <div className="mb-4">
              <Input
                type="email"
                label="Email"
                placeholder="Enter your email address"
                {...register("email", {
                  required: "Email is required",
                })}
                error={errors.email?.message}
              />
            </div>

            <div className="relative mb-4">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                })}
                error={errors.password?.message}
              />
              <button
                type="button"
                className="absolute right-0 top-[60%] flex items-center px-3 text-gray-500"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="flex justify-end mb-8">
              <Link href={`/adminpanel/resetPassword`}>
                <p className="text-tertiary text-sm">Forgot Password?</p>
              </Link>
            </div>

            <div>
              <PrimaryButton disabled={isSubmitting}>
                {isSubmitting ? "Loading..." : "Login"}
              </PrimaryButton>
            </div>
          </div>
        </form>
      </div>
      <Toaster />
    </>
  );
};

export default LoginForm;
