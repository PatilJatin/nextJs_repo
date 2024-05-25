"use client";
import {
  getHomeDetailsAction,
  homeDetailsSelector,
} from "@/redux/features/adminpanel/homeDetails/homeDetails.slice";
import { useAppDispatch, useAppSelector } from "@/redux/features/hook";
import Image from "next/image";
import React, { useEffect } from "react";
import Carousel from "./Carousel";

const HeroSection = () => {
  const dispatch = useAppDispatch();
  const { homeDetails, status } = useAppSelector(homeDetailsSelector);

  useEffect(() => {
    dispatch(getHomeDetailsAction());
  }, []);
  return (
    <div className="pb-[40px] md:pb-[60px] px-4 md:px-10 w-full h-[19vh] lg:h-[45vh]">
      {/* <div className=" h-[126px] md:h-[150px] lg:h-[238px] ">
        <Image
          src={
            homeDetails.heroSliderImages?.[0] ||
            "/assets/home/hero/hero-img.svg"
          }
          alt="hero-img"
          width={1360}
          height={238}
          className="w-full h-full object-cover object-center"
        />
      </div> */}
      <Carousel images={homeDetails.heroSliderImages} />
    </div>
  );
};

export default HeroSection;
