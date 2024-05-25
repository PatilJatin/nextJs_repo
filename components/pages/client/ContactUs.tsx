"use client";
import { Input } from "@/components/formComponents/Input";
import GlobalSearch from "@/components/reusable/GlobalSearch";
import {
  contactDetailsSelector,
  getContactDetailsAction,
} from "@/redux/features/adminpanel/contactDetails/contact.slice";
import { addLeadAction } from "@/redux/features/adminpanel/leads/leads.slice";
import { useAppDispatch, useAppSelector } from "@/redux/features/hook";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";

type Props = {};
type LeadFormFields = {
  firstName: string;
  lastName: string;
  mobileNumber: number;
  email: string;
  query: string;
};

function ContactUs({}: Props) {
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
    setLoading(() => true);

    const resdata = await axios.post("/api/v1/aws/send-user-info-to-owner", {
      name: data.firstName + " " + data.lastName,
      email: data.email,
      phoneNo: +data.mobileNumber,
      query: data.query,
    });

    console.log(resdata);

    const payloadData = {
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.mobileNumber.toString(),
      query: data.query,
      sourceName: "contact us",
      email: data.email,
    };

    const res = await dispatch(addLeadAction(payloadData));
    console.log(res);
    setLoading(() => false);
    reset();
    // toast.success()
  };
  const { contactDetails, status } = useAppSelector(contactDetailsSelector);

  useEffect(() => {
    dispatch(getContactDetailsAction());
  }, []);
  console.log(contactDetails);

  return (
    <div className="section-padding">
      <GlobalSearch />
      <div className="mt-6 flex flex-col lg:flex-row justify-between items-center gap-8">
        <div className="left-container flex flex-col gap-5 lg:gap-12 lg:w-[30%] self-start">
          <div className="flex flex-col gap-2 lg:gap-5">
            <h3 className="text-primary font-medium text-2xl leading-8 lg:text-[40px] lg:leading-[55px]">
              Contact Us
            </h3>
            <p className="text-base lg:text-xl font-normal leading-6 lg:leading-7 text-tertiary">
              Contact Sanjay Gupta the Founder of Condo Kharido, directly by:
            </p>
          </div>
          <div>
            <div className="flex justify-start items-center gap-3 mb-3 lg:mb-5">
              <Image
                src={"/assets/contact-us/envelope.svg"}
                alt=""
                width={20}
                height={16}
                className="w-4 h-3 lg:w-7 lg:h-7"
              />
              <p className="contact-us-p">
                {contactDetails.email || "hello@relume.io"}
              </p>
            </div>
            <div className="flex justify-start items-center gap-3  mb-3 lg:mb-5">
              <Image
                src={"/assets/contact-us/phone.svg"}
                alt=""
                width={20}
                height={16}
                className="w-4 h-3 lg:w-7 lg:h-7"
              />
              <p className="contact-us-p">
                {contactDetails.phoneNumber || "+1 (555) 000-0000"}
              </p>
            </div>
            <div className="flex justify-start items-center gap-3 mb-3 lg:mb-5">
              <Image
                src={"/assets/contact-us/map.svg"}
                alt=""
                width={20}
                height={16}
                className="w-4 h-3 lg:w-7 lg:h-7"
              />
              <p className="contact-us-p">
                {contactDetails.address || "123 Sample St, Sydney NSW 2000 AU"}
              </p>
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full  flex-col justify-between items-center gap-6 lg:gap-8 lg:w-[47%]"
        >
          <div className="w-full grid grid-cols-1 gap-3">
            <Input
              id="firstName"
              label="First Name*"
              placeholder="Enter Your First Name"
              error={errors.firstName?.message}
              {...register("firstName", {
                required: "First Name is required",
              })}
            />
            <Input
              id="lastName"
              label="Last Name*"
              placeholder="Enter Your Last Name"
              error={errors.lastName?.message}
              {...register("lastName", {
                required: "Last Name is required",
              })}
            />
            <Input
              id="mobileNumber"
              label="Phone Number*"
              placeholder="Enter Your Phone Number"
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
              label="Email*"
              type="email"
              placeholder="Enter your Email Id"
              error={errors.email?.message}
              {...register("email", {
                required: "Email is required",
              })}
            />

            <label htmlFor="Query*">Enter Your Message*</label>
            <textarea
              id="query"
              rows={10}
              cols={10}
              placeholder="Enter Your Message Here"
              {...register("query", {
                required: "Message is required",
              })}
              className="font-Poppins font-normal leading-[22.4px]  w-full border border-tertiary rounded-[4px] px-3 py-3 text-sm outline-none focus:outline-none focus:border focus:border-black"
            />
            {errors.query && (
              <p className="text-red-500">{errors.query.message}</p>
            )}

            <div className="hidden  md:block"></div>
          </div>
          <div className="w-full flex justify-start">
            <button type="submit" className="primary-button ">
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
}

export default ContactUs;
