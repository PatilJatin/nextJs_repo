"use client";
import ProjectCard from "@/components/reusable/ProjectCard";
import { Project } from "@/types/project-type";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Hashtag = ({ params }: { params: { id: string; based: string } }) => {
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [url, setURL] = useState<String>("");
  const [displayedItems, setDisplayedItems] = useState(16); //set to 12
  const [loading, setLoading] = useState(false);

  const getAllProjects = async () => {
    try {
      let apiUrl = "";
      console.log(params.based, params.id);

      if (params.based === "category") {
        apiUrl = `/api/v1/projects/having-category/${params.id}`;
      } else if (params.based === "family-project") {
        apiUrl = "/api/v1/projects/single-family";
      } else if (params.based === "hashtags") {
        apiUrl = `/api/v1/projects/having-tag/${params.id}`;
      } else if (params.based === "upcoming") {
        apiUrl = "/api/v1/projects/upcoming";
      } else if (params.based === "closein") {
        apiUrl = `/api/v1/projects/closing-in/${params.id}`;
      } else if (params.based === "recents") {
        apiUrl = `/api/v1/projects/top10recent`;
      } else {
        apiUrl = "/api/v1/projects";
      }

      console.log(apiUrl);
      setLoading(() => true);
      const response = await axios.get(apiUrl);
      console.log(response.data);
      setProjectList((prevProjects) => response.data.data || prevProjects);
      setLoading(() => false);
      // setDisplayedItems(response.data.data.length);
    } catch (error: any) {
      // console.log(error.message);
      toast.error("Refresh the Page");
      setLoading(() => false);
    }
  };
  useEffect(() => {
    getAllProjects();
    // // console.log(projectList);
  }, []);

  const allItems = projectList.length;

  const handleLoadMore = () => {
    const remainingItems = allItems - displayedItems;
    const nextDisplayCount = Math.min(16, remainingItems);

    setDisplayedItems((prev) => prev + nextDisplayCount);
  };
  console.log(decodeURIComponent(params.based), decodeURIComponent(params.id));

  return (
    <div className="w-full ">
      <div className="w-[85%] mx-auto">
        <div className="py-8">
          <h1 className="  font-Lato  text-black  text-2xl sm:text-3xl md:text-4xl mb-3 lg:text-5xl font-medium">
            Results for{" "}
            {decodeURIComponent(params.based) === "hashtags"
              ? `#${decodeURIComponent(params.id)}`
              : decodeURIComponent(params.based)}
            {" projects"}
          </h1>
          <p className="text-base text-[#171717] mb-6 md:mb-8 lg:mb-12">
            {displayedItems >= allItems ? allItems : displayedItems} of{" "}
            {allItems} results
          </p>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-8 mb-12">
            {projectList.slice(0, displayedItems).map((item) => {
              return <ProjectCard key={item._id} data={item} />;
            })}
          </div>

          {loading && (
            <div className="filtered-data-container flex justify-between items-stretch  flex-col  gap-3 sm:flex-row sm:flex-wrap ">
              <div className="basis-full sm:basis-[45%] md:basis-[45%] lg:basis-[32%] flex flex-col justify-start px-2 py-1 animate-pulse">
                <div className="w-[100%] h-64 bg-gray-300 opacity-80 flex justify-center items-center">
                  <svg
                    className="w-10 h-10 text-gray-200 dark:text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                  </svg>
                </div>
                <div className="p-6 bg-background-400 h-60">
                  <div className="h-8 bg-background-500 mb-2 rounded-md"></div>
                  <div className="h-8 w-[80%] bg-background-500 mb-2  rounded-md"></div>
                  <div className="h-6 w-[80%] bg-background-500 mb-2 rounded-md"></div>
                  <div className="h-6 w-[60%] bg-background-500 mb-2 rounded-md"></div>
                  <div className="h-6 w-[80%] bg-background-500 rounded-md"></div>
                </div>
              </div>
              <div className="basis-full sm:basis-[45%] md:basis-[45%] lg:basis-[32%] flex flex-col justify-start px-2 py-1 animate-pulse">
                <div className="w-[100%] h-64 bg-gray-300 opacity-80 flex justify-center items-center">
                  <svg
                    className="w-10 h-10 text-gray-200 dark:text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                  </svg>
                </div>
                <div className="p-6 bg-background-400 h-60">
                  <div className="h-8 bg-background-500 mb-2 rounded-md"></div>
                  <div className="h-8 w-[80%] bg-background-500 mb-2  rounded-md"></div>
                  <div className="h-6 w-[80%] bg-background-500 mb-2 rounded-md"></div>
                  <div className="h-6 w-[60%] bg-background-500 mb-2 rounded-md"></div>
                  <div className="h-6 w-[80%] bg-background-500 rounded-md"></div>
                </div>
              </div>
              <div className="basis-full sm:basis-[45%] md:basis-[45%] lg:basis-[32%] flex flex-col justify-start px-2 py-1 animate-pulse">
                <div className="w-[100%] h-64 bg-gray-300 opacity-80 flex justify-center items-center">
                  <svg
                    className="w-10 h-10 text-gray-200 dark:text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                  </svg>
                </div>
                <div className="p-6 bg-background-400 h-60">
                  <div className="h-8 bg-background-500 mb-2 rounded-md"></div>
                  <div className="h-8 w-[80%] bg-background-500 mb-2  rounded-md"></div>
                  <div className="h-6 w-[80%] bg-background-500 mb-2 rounded-md"></div>
                  <div className="h-6 w-[60%] bg-background-500 mb-2 rounded-md"></div>
                  <div className="h-6 w-[80%] bg-background-500 rounded-md"></div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-center items-center ">
            {!(displayedItems >= allItems) && (
              <button onClick={handleLoadMore} className="primary-button">
                Load More
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hashtag;
