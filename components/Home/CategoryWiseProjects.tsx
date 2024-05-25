"use client";

import { Project } from "@/types/project-type";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ProjectCard from "../reusable/ProjectCard";
import Link from "next/link";
import Image from "next/image";
import PrimarySpinner from "../shared/loaders/PrimarySpinner";

const CategoryWiseProjects = () => {
  const [categories, setCategories] = useState<String[]>([]);
  const [sliderIndex, setSliderIndex] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] =
    useState<String>("Best Selling");
  const properties = useRef<Project[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const getAllCategory = async () => {
    try {
      const response = await axios.get(`/api/v1/categories-and-hashtags`);
      setCategories(() => response?.data?.data?.propertyCategories);
    } catch (error: any) {
      console.error(error.message);
    }
  };
  const getProperty = async (category: String) => {
    console.log(properties.current);

    const filteredProperties = properties.current.filter((project) =>
      project.categories.includes(category.toString())
    );

    // Sort the filtered properties by the specified category name
    filteredProperties.sort((a, b) => {
      const categoryA = a.categories.indexOf(category.toString());
      const categoryB = b.categories.indexOf(category.toString());

      return categoryA - categoryB;
    });

    setLoading(() => false);
    // filteredProperties.current = filteredproperties;
    setFilteredProperties(() => filteredProperties);
    // console.log(filteredProperties);
  };
  const getAllProjects = async () => {
    try {
      const response = await axios.get(`/api/v1/projects`);

      properties.current = response?.data?.data.projects;

      setFilteredProperties(response?.data?.data.projects);
      console.log(response?.data?.data);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(() => true);
      await Promise.all([getAllCategory(), getAllProjects()]);
      getProperty("Best Selling");
    };

    fetchData();
  }, []);
  const handleTabClick = (category: String) => {
    setSelectedCategory(category);
    getProperty(category);
  };

  const tabsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tabsContainerRef.current) {
      tabsContainerRef.current.scrollLeft = 0;
    }
  }, []);

  const handleNextButtonClick = () => {
    if (tabsContainerRef.current) {
      tabsContainerRef.current.scrollLeft += 100; // Adjust the scroll amount as needed
    }
  };
  console.log(selectedCategory);
  console.log(filteredProperties);

  return (
    <section
      id="ProjectUnder"
      className="section-padding  scroll-m-40 lg:scroll-m-60 "
    >
      <div className=" flex flex-col justify-between items-start gap-3 md:gap-8">
        <h3 className="home-section-heading">Project under</h3>
        <div className="flex w-full justify-between items-center mb-2">
          <div
            className="w-full flex justify-start gap-4 lg:gap-4 selection-tabs overflow-x-auto whitespace-nowrap scrollbar-none "
            ref={tabsContainerRef}
          >
            {categories?.map((category, index) => (
              <button
                key={index}
                className={` home-section-button  ${
                  selectedCategory === category
                    ? "  text-primary font-medium  bg-primary-400    "
                    : "  text-tertiary font-normal "
                }   `}
                onClick={() => handleTabClick(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* <div className="">
            <button onClick={handleNextButtonClick}>
              <Image
                src={`/assets/home/other/nextProjectHome.svg`}
                height={15}
                width={15}
                alt="next project"
              />{" "}
            </button>
          </div> */}
        </div>

        <div className="hidden grid-container w-full">
          {filteredProperties.slice(0, 4).map((project) => (
            <ProjectCard key={project._id} data={project} />
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

        {filteredProperties.length === 0 && (
          <p className="text-base lg:text-lg text-tertiary font-medium w-full text-center">
            Result Not Found
          </p>
        )}
        <div className="w-full sm:hidden relative flex flex-col justify-center items-center gap-2">
          <div className="w-full transition-all	delay-200 ease-in-out duration-500">
            {filteredProperties.length >= 3 && (
              <ProjectCard data={filteredProperties[sliderIndex]} />
            )}
          </div>
          <div className="flex self-start justify-start items-center gap-3 p-2">
            <div
              className={`${
                sliderIndex === 0 ? " bg-primary " : " bg-tertiary "
              }  rounded-full w-2 h-2`}
              onClick={() => setSliderIndex(0)}
            />
            <div
              className={`${
                sliderIndex === 1 ? " bg-primary " : " bg-tertiary "
              }  rounded-full w-2 h-2`}
              onClick={() => setSliderIndex(1)}
            />
            <div
              className={`${
                sliderIndex === 2 ? " bg-primary " : " bg-tertiary "
              }  rounded-full w-2 h-2`}
              onClick={() => setSliderIndex(2)}
            />
            <div
              className={`${
                sliderIndex === 3 ? " bg-primary " : " bg-tertiary "
              }  rounded-full w-2 h-2`}
              onClick={() => setSliderIndex(3)}
            />
          </div>
        </div>
        {!loading && filteredProperties.length > 0 && (
          <div className="flex justify-center items-center w-full">
            <Link
              href={`/result-for/category/${selectedCategory}`}
              className="primary-button "
            >
              View All
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryWiseProjects;
