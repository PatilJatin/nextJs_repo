"use client";
import { homeNavigation } from "@/constants/Home";
import PageNavCard from "../reusable/PageNavCard";
import {
  getHomeDetailsAction,
  homeDetailsSelector,
} from "@/redux/features/adminpanel/homeDetails/homeDetails.slice";
import { useAppDispatch, useAppSelector } from "@/redux/features/hook";
import { useEffect, useState } from "react";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import axios from "axios";

const Footer = ({ setAskQuestionModal }: any) => {
  const dispatch = useAppDispatch();
  const { homeDetails, status } = useAppSelector(homeDetailsSelector);
  const [categories, setCategories] = useState<String[]>([]);

  const getAllCategory = async () => {
    try {
      const response = await axios.get(`/api/v1/dynamicData`);
      setCategories(() => response?.data?.data?.categories);
    } catch (error: any) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    dispatch(getHomeDetailsAction());
    getAllCategory();
  }, []);
  return (
    <>
      <section className="py-11 font-Poppins">
        <div className="mx-auto w-full md:w-5/6">
          <div className="flex flex-col items-center">
            <Link
              href={`/home`}
              className="w-[50%] lg:w-full flex justify-center items-center "
            >
              <Image
                src={"/assets/navbar/nav-logo.svg"}
                width={100}
                height={100}
                className="w-60"
                alt="logo"
              />
            </Link>
            <div className="w-[90%] lg:w-[50%] pt-6 text-center text-lg  text-black text-opacity-90 font-light">
              Lorem ipsum dolor sit amet, consectetur adipisc elit. Suspendisse
              varius enim in eros elementum tristique.em ipsum dolor sit
            </div>
          </div>

          <div className="mx-auto w-full flex flex-wrap border-b border-gray-400 py-11 justify-evenly  text-center md:text-left md:gap-5 lg:gap-0">
            <div className="mb-8 w-full  sm:w-1/2 md:mb-0 md:w-1/2 lg:w-[30%] flex flex-col items-center lg:items-start">
              <h2 className="mb-4 text-base text-secondary font-bold text-background-500 align-baseline leading-5">
                Home
              </h2>

              <ul>
                <li className="py-1 text-center lg:text-left">
                  <Link
                    target="_blank"
                    href={`/result-for/recents/recents`}
                    className="text-lg font-normal   text-tertiary hover:text-black leading-6 "
                  >
                    Projects launched recently
                  </Link>
                </li>

                <li className="py-1 text-center lg:text-left">
                  <Link
                    target="_blank"
                    href={`/result-for/upcoming/upcoming`}
                    className="text-lg font-normal  text-tertiary  hover:text-black leading-6 "
                  >
                    Upcoming projects in next month
                  </Link>
                </li>
              </ul>
            </div>

            <div className="mb-8 w-full sm:w-1/2 md:mb-0 md:w-1/2 lg:w-[22%] mx-5  flex flex-col  items-center lg:items-start">
              <h2 className="mb-4 text-base text-secondary font-bold text-background-500 align-baseline">
                Hot Projects Just for you
              </h2>
              <ul>
                {categories.slice(0, 6).map((category, index) => (
                  <li key={index} className="py-1 text-center lg:text-left">
                    <Link
                      target="_blank"
                      href={`/result-for/category/${encodeURIComponent(
                        category.toString()
                      )}`}
                      className="text-lg font-normal  text-tertiary  hover:text-black leading-6 "
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8 w-full sm:w-1/2 md:mb-0 md:w-1/2  lg:w-[23%]  mx-2 flex flex-col items-center lg:items-start lg:pl-7 ">
              <h2 className="mb-4 basis-full text-base text-secondary font-bold text-background-500 ">
                Projects closing in
              </h2>
              <ul>
                <li className="py-1 text-center lg:text-left">
                  <Link
                    target="_blank"
                    href={`/result-for/closein/1`}
                    className="text-lg font-normal  text-tertiary  hover:text-black leading-6 "
                  >
                    Projects under 1 Year
                  </Link>
                </li>
                <li className="py-1 text-center lg:text-left">
                  <Link
                    target="_blank"
                    href={`/result-for/closein/2`}
                    className="text-lg font-normal  text-tertiary  hover:text-black leading-6 "
                  >
                    Projects under 2 Year
                  </Link>
                </li>
                <li className="py-1 text-center lg:text-left">
                  <Link
                    target="_blank"
                    href={`/result-for/closein/3`}
                    className="text-lg font-normal  text-tertiary  hover:text-black leading-6 "
                  >
                    Projects under 3 Year
                  </Link>
                </li>
                <li className="py-1 text-center lg:text-left">
                  <Link
                    target="_blank"
                    href={`/result-for/closein/4`}
                    className="text-lg font-normal  text-tertiary  hover:text-black leading-6 "
                  >
                    Projects under 4 Year
                  </Link>
                </li>
                <li className="py-1 text-center lg:text-left">
                  <Link
                    target="_blank"
                    href={`/result-for/closein/5`}
                    className="text-lg font-normal  text-tertiary  hover:text-black leading-6 "
                  >
                    Projects under 5 Year
                  </Link>
                </li>
                <li className="py-1 text-center lg:text-left">
                  <Link
                    target="_blank"
                    href={`/result-for/closein/12`}
                    className="text-lg font-normal  text-tertiary  hover:text-black leading-6 "
                  >
                    Projects under 6+ Year
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mb-8 w-full sm:w-1/2 md:mb-0 md:w-1/2 lg:w-[18%]    flex flex-col items-center  ">
              <h2 className="mb-4 text-base text-secondary font-bold text-background-500 ">
                Other links
              </h2>
              <ul className=" ">
                <li className="py-1 text-center lg:text-left">
                  <Link
                    href={"/home"}
                    className="text-lg font-normal  text-tertiary  hover:text-black leading-6 text-left "
                  >
                    Home
                  </Link>
                </li>
                <li className="py-1 text-center lg:text-left">
                  <Link
                    href={"/about-us"}
                    className="text-lg font-normal  text-tertiary  hover:text-black leading-6 text-left "
                  >
                    About Us
                  </Link>
                </li>
                <li className="py-1 text-center lg:text-left">
                  <Link
                    href={"/contact-us"}
                    className="text-lg font-normal  text-tertiary  hover:text-black leading-6 "
                  >
                    Contact Us
                  </Link>
                </li>
                <li className="py-1 text-center lg:text-left">
                  <Link
                    href={"/project/new-condos"}
                    className="text-lg font-normal  text-tertiary  hover:text-black leading-6 "
                  >
                    Condos
                  </Link>
                </li>
                <li className="py-1 text-center lg:text-left">
                  <Link
                    href={"/podcasts"}
                    className="text-lg font-normal  text-tertiary  hover:text-black leading-6 text-left "
                  >
                    Podcasts
                  </Link>
                </li>
                <li className="py-1 text-center lg:text-left">
                  <Link
                    href={"/blogs"}
                    className="text-lg font-normal  text-tertiary  hover:text-black leading-6 text-left "
                  >
                    Blogs
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="py-4 flex flex-col items-center md:flex-row md:justify-between">
            <div className="flex-grow flex flex-col lg:flex-row mb-4 md:mb-0 items-center md:items-start">
              <div className="font-medium text-base leading-5 text-tertiary">
                <span>
                  {" "}
                  <Link href={"/privacy-policy"}>Privacy Policy</Link>{" "}
                </span>
                /
                <span>
                  {" "}
                  <Link href={"/how-to-screen"}>How To Screen</Link>
                </span>
              </div>
            </div>

            <div className="flex justify-center md:justify-end space-x-4">
              <Link
                className="p-1"
                target="_blank"
                href={
                  homeDetails.socialLinks.find(
                    (link) => link.name === "Youtube"
                  )?.link || "https://www.youtube.com/@agentsanjaygupta"
                }
              >
                <img
                  src={"/assets/footer/youtube.svg"}
                  width={28}
                  height={28}
                  className="w-7"
                  alt="YouTube Icon"
                />
              </Link>
              <Link
                className="p-1"
                target="_blank"
                href={
                  homeDetails.socialLinks.find(
                    (link) => link.name === "Facebook"
                  )?.link || "https://www.facebook.com/AgentSanjayGupta"
                }
              >
                <img
                  src={"/assets/footer/facebook.svg"}
                  width={28}
                  height={28}
                  className="w-7"
                  alt="Facebook Icon"
                />
              </Link>
              <Link
                className="p-1"
                target="_blank"
                href={
                  homeDetails.socialLinks.find(
                    (link) => link.name === "Instagram"
                  )?.link || "https://www.instagram.com/AgentSanjayGupta/"
                }
              >
                <img
                  src={"/assets/footer/instagram.svg"}
                  width={28}
                  height={28}
                  className="w-7"
                  alt="Instagram Icon"
                />
              </Link>
              <Link
                className="p-1"
                target="_blank"
                href={
                  homeDetails.socialLinks.find(
                    (link) => link.name === "Twitter"
                  )?.link ||
                  "https://twitter.com/i/flow/login?redirect_after_login=%2FAgentSanjayEXP"
                }
              >
                <img
                  src={"/assets/footer/twitter.svg"}
                  width={28}
                  height={28}
                  className="w-7"
                  alt="Twitter Icon"
                />
              </Link>
              <Link
                className="p-1"
                target="_blank"
                href={
                  homeDetails.socialLinks.find(
                    (link) => link.name === "Linkedin"
                  )?.link || "https://www.linkedin.com/in/skguptarealtor/"
                }
              >
                <img
                  src={"/assets/footer/linkedin.svg"}
                  width={28}
                  height={28}
                  className="w-7"
                  alt="LinkedIn Icon"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-background-500 w-full py-3">
        <div className="w-[88%] mx-auto flex flex-col md:flex-row gap-2 justify-between items-center">
          <div className="text-tertiary font-Lato opacity-60 font-medium leading-5 text-sm md:text-base lg:text-lg">
            © Copyrights | All rights are reserved
          </div>
          <div className=" order-first md:order-last flex justify-between items-center gap-4 ">
            <p className="text-tertiary font-Lato opacity-60 font-medium  text-sm md:text-base lg:text-lg ">
              Still have a doubt?
            </p>
            <Link
              href={"/contact-us"}
              className="bg-primary text-white py-2 px-4 text-sm md:text-base lg:text-lg rounded"
              // onClick={() => setAskQuestionModal(() => true)}
            >
              Ask a Question
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
