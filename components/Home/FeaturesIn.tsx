"use client";
import {
  getHomeDetailsAction,
  homeDetailsSelector,
} from "@/redux/features/adminpanel/homeDetails/homeDetails.slice";
import { useAppDispatch, useAppSelector } from "@/redux/features/hook";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const FeaturesIn = () => {
  const dispatch = useAppDispatch();
  const { homeDetails, status } = useAppSelector(homeDetailsSelector);

  useEffect(() => {
    dispatch(getHomeDetailsAction());
  }, []);
  console.log(homeDetails);
  return (
    <div className="px-4 lg:px-36  pb-10 lg:pb-[120px]">
      <h3 className="font-medium text-primary text-xl leading-7 md:text-3xl lg:text-[42px] lg:leading-[58px] w-full  text-center">
        Featured&nbsp;In
      </h3>
      <div className="grid grid-cols-4 gap-3 lg:gap-20 pt-4 lg:pt-10">
        {homeDetails.featuredInSection.map((img, index) => (
          <div key={index}>
            <Image
              src={img.imageSrc || "/assets/home/featuresIN/CBC_logo.svg"}
              alt="logo"
              width={200}
              height={200}
              className=""
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesIn;
