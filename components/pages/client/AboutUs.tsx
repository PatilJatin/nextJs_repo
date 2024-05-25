"use client";

import GlobalSearch from "@/components/reusable/GlobalSearch";
import ProjectCard from "@/components/reusable/ProjectCard";
import PrimarySpinner from "@/components/shared/loaders/PrimarySpinner";
import {
  aboutDetailsSelector,
  getAboutDetailsAction,
} from "@/redux/features/adminpanel/aboutDetails/aboutDetails.slice";
import { useAppDispatch, useAppSelector } from "@/redux/features/hook";
import { Project } from "@/types/project-type";
import axios from "axios";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const AboutUsPage = () => {
  const properties = useRef<Project[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Project[]>([]);
  const [dynamicData, setDynamicData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { status, aboutDetails } = useAppSelector(aboutDetailsSelector);

  const getProperty = async (category: String) => {
    const filteredProperties = properties.current.filter(
      (project) => project.isUpcomingProject === true
    );

    // filteredProperties.current = filteredproperties;
    setFilteredProperties(() => filteredProperties);
    setLoading(() => false);

    // // console.log(filteredProperties.current);
  };
  const getAllProjects = async () => {
    try {
      const response = await axios.get(`/api/v1/projects`);

      properties.current = response?.data?.data.projects;

      setFilteredProperties(() => response?.data?.data.projects);
    } catch (error: any) {
      console.error(error.message);
    }
  };
  const getDyanamicData = async () => {
    try {
      const response = await axios.get(`/api/v1/dynamicData`);

      setDynamicData(() => response?.data?.data);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(() => true);

      await Promise.all([getAllProjects(), getDyanamicData()]);
      getProperty("Best Selling");
    };

    fetchData();
  }, []);
  useEffect(() => {
    dispatch(getAboutDetailsAction());
  }, []);

  return (
    <div className=" w-[100%]  bg-white">
      <div className="section-padding ">
        <h3 className="text-primary text-2xl md:text-4xl md:leading-[56px] leading-8 font-medium mt-6 md:px-20">
          A little more about me
        </h3>
        <div className="flex flex-col lg:flex-row justify-between items-center md:justify-start md:gap-20  gap-4 md:px-20">
          <div className="left-container flex flex-col justify-between items-start gap-1 lg:w-[40%] ">
            <div className="w-[358px] h-[358px] md:w-full md:h-[400px] object-cover">
              <Image
                src={aboutDetails.image || "/assets/about-us/sanjaygupta.svg"}
                alt="owner-photo"
                width={358}
                height={358}
                className="w-full h-full"
              />
            </div>
            <div>
              <p className="font-normal  text-xs md:text-xl leading-4 text-secondary">
                Designation:{" "}
                <span className="font-light  text-tertiary">
                  {aboutDetails.designation}
                </span>
              </p>
              <p className="font-normal text-xs md:text-xl  leading-4 text-secondary">
                Specialty:{" "}
                <span className="font-light  text-tertiary">
                  {aboutDetails.speciality.map(
                    (spec: any, index: any) => spec?.toString() + ", "
                  )}
                </span>
              </p>
              <p className="font-normal text-xs md:text-xl  leading-4 text-secondary">
                Area Covered:{" "}
                <span className="font-light  text-tertiary">
                  {aboutDetails.areaCovered.map(
                    (spec: any) => spec?.toString() + ", "
                  )}
                </span>
              </p>
            </div>
          </div>
          <div className="right-container flex flex-col justify-between items-start gap-3 md:gap-9 lg:w-[50%]">
            <div className="space-y-1">
              <h3 className="font-medium text-xl md:text-3xl  leading-7 md:leading-10 ">
                {aboutDetails.name}
              </h3>
              <p className="text-sm md:text-xl font-normal leading-5 md:leading-6 text-tertiary">
                {aboutDetails.role}
              </p>
            </div>
            <div className="relative text-tertiary pl-3 md:pt-11 md:pl-10">
              <div className="hidden absolute left-0 top-0 w-3 h-3 md:w-11 md:h-11 object-cover">
                <Image
                  src={"/assets/other/Quote.svg"}
                  alt=""
                  width={11.5}
                  height={10}
                  className=" w-full h-full"
                />
              </div>

              <span
                className=" text-sm md:text-xl leading-5 md:leading-7 font-light"
                dangerouslySetInnerHTML={{ __html: aboutDetails.description }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className=" section-padding">
        <div className="UpComingProjects-container  w-[97%]   mx-auto flex flex-col justify-center gap-4 md:gap-14 text-text-color-400">
          <h3 className="home-section-heading">Current Hot Projects</h3>

          <div className="filtered-data w-full ">
            <div className="filtered-data-container  grid  grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 ">
              {filteredProperties.slice(0, 4).map((property) => (
                <ProjectCard key={property._id} data={property} />
              ))}
              {loading && (
                <>
                  {[...Array(4)].map((_, index) => (
                    <div
                      key={index}
                      className="animate-pulse flex flex-col justify-start items-start sm:p-4 md:p-0 gap-4 mb-10 lg:mb-0"
                    >
                      <div className="w-full h-[260px] bg-gradient-to-r from-gray-300 to-gray-200 rounded"></div>
                      <div className="text-primary font-bold text-xl line-clamp-1 leading-8 bg-gradient-to-r from-gray-300 to-gray-200"></div>
                      <div className="flex flex-col justify-between items-start gap-1 ">
                        <div className="flex justify-start items-center gap-1">
                          <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                          <div className="w-28 h-4 bg-gray-200 rounded-full"></div>
                        </div>
                        <div className="project-card-label">
                          <div className="w-20 h-4 bg-gray-200 rounded-full"></div>
                        </div>
                        <div className="project-card-label">
                          <div className="w-40 h-4 bg-gray-200 rounded-full"></div>
                        </div>
                        <div className="project-card-label">
                          <div className="w-32 h-4 bg-gray-200 rounded-full"></div>
                        </div>
                        <div className="project-card-label">
                          <div className="w-24 h-4 bg-gray-200 rounded-full"></div>
                        </div>
                        <div className="project-card-label">
                          <div className="w-40 h-4 bg-gray-200 rounded-full"></div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center gap-2 bg-gradient-to-r from-gray-300 to-gray-200">
                        <div className="w-12 h-4 bg-gray-200 rounded-full"></div>
                        <div className="w-12 h-4 bg-gray-200 rounded-full"></div>
                        <div className="w-12 h-4 bg-gray-200 rounded-full"></div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
            {!loading && filteredProperties.length > 0 && (
              <div className=" pt-10 flex justify-center items-center w-full">
                <Link
                  href={`/result-for/recents/recents`}
                  className="primary-button "
                >
                  View All
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
