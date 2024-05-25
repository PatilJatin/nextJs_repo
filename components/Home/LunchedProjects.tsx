"use client";

import { Project } from "@/types/project-type";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ProjectCard from "../reusable/ProjectCard";
import Link from "next/link";
import Image from "next/image";
import PrimarySpinner from "../shared/loaders/PrimarySpinner";

const LunchedProjects = () => {
  const [topRecentProjects, setTopRecentProjects] = useState<Project[]>([]);
  const [sliderIndex, setSliderIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const getTopRecentProject = async () => {
    try {
      const response = await axios.get(`/api/v1/projects/recently-launched`);
      console.log(response);
      setTopRecentProjects(response.data.data);
      setLoading(() => false);
    } catch (error: any) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    setLoading(() => true);
    getTopRecentProject();
  }, []);
  return (
    <section
      id="recentProject"
      className="flex  scroll-m-40 lg:scroll-m-60 flex-col justify-between items-start section-padding gap-1 md:gap-4"
    >
      <h3 className="home-section-heading">Projects launched in last week</h3>

      <div className=" hidden grid-container mt-5">
        {topRecentProjects
          .slice(0, 4)
          .map((project: Project, index: number) => {
            return <ProjectCard key={index} data={project} />;
          })}

        {loading && (
          <>
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse flex flex-col justify-start items-start sm:p-4 md:p-0 gap-4 mb-10 lg:mb-0">
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

      {topRecentProjects.length === 0 && (
        <p className="text-base lg:text-lg text-tertiary font-medium w-full text-center">
          Result Not Found
        </p>
      )}
      <div className="w-full sm:hidden relative flex flex-col justify-center items-center gap-2">
        <div className="w-full transition-all	delay-200 ease-in-out duration-500">
          {topRecentProjects.length >= 3 && (
            <ProjectCard data={topRecentProjects[sliderIndex]} />
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
      {!loading && topRecentProjects.length > 0 && (
        <div className="flex justify-center items-center w-full">
          <Link
            href={`/result-for/recents/recents`}
            className="primary-button "
          >
            View All
          </Link>
        </div>
      )}
    </section>
  );
};

export default LunchedProjects;
