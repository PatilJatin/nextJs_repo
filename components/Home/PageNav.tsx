"use client";
import { homeNavigation } from "@/constants/Home";
import PageNavCard from "../reusable/PageNavCard";
import {
  getHomeDetailsAction,
  homeDetailsSelector,
} from "@/redux/features/adminpanel/homeDetails/homeDetails.slice";
import { useAppDispatch, useAppSelector } from "@/redux/features/hook";
import Image from "next/image";
import React, { useEffect } from "react";

const PageNav = () => {
  const dispatch = useAppDispatch();
  const { homeDetails, status } = useAppSelector(homeDetailsSelector);

  useEffect(() => {
    dispatch(getHomeDetailsAction());
  }, []);
  console.log(homeDetails);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-1 section-padding ">
      {homeNavigation.map((navData, index) => (
        <PageNavCard
          key={index}
          head={navData.content}
          imgSrc={homeDetails.navigationImages[index] || navData.imageSrc}
          goto={navData.goto}
        />
      ))}
    </div>
  );
};

export default PageNav;
