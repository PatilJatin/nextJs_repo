"use client";
import {
  getHomeDetailsAction,
  homeDetailsSelector,
} from "@/redux/features/adminpanel/homeDetails/homeDetails.slice";
import { useAppDispatch, useAppSelector } from "@/redux/features/hook";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const HomeBanners = () => {
  const dispatch = useAppDispatch();
  const { homeDetails, status } = useAppSelector(homeDetailsSelector);

  useEffect(() => {
    dispatch(getHomeDetailsAction());
  }, []);
  console.log(homeDetails);

  return (
    <div className="">
      {homeDetails.homeAdvertise.map((adv, index) => (
        <div
          key={index}
          className="flex  flex-col md:flex-row justify-between items-stretch section-padding gap-3 md:gap-10"
        >
          <div className="flex flex-col justify-between items-start gap-1 md:gap-5 py-0 md:py-[72px] w-full md:w-[40%]">
            <h4 className="font-medium text-xl md:text-[40px] leading-8 md:leading-[56px] text-primary">
              {adv.title || "Investing in Pre-Construction Condos in Toronto"}
            </h4>

            <p
              className="home-section-para"
              dangerouslySetInnerHTML={{ __html: adv.description }}
            />
            <Link
              href={adv.navigateTo || "/project/new-condos"}
              className="primary-button mt-3"
            >
              {" "}
              {adv.buttonText || "Search New Condos"}
            </Link>
          </div>
          <div
            className={` w-full  ${
              adv.isImageOnRightSide
                ? "  order-first md:order-last  "
                : "  order-last md:order-first  "
            } md:w-[50%] h-[220px] md:h-[420px]`}
          >
            <Image
              src={adv.imageSrc || "/assets/home/other/new-condo-ref.svg"}
              alt="img"
              className="w-full h-full "
              width={500}
              height={400}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeBanners;
