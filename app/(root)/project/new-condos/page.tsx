"use client";

import ProjectCard from "@/components/reusable/ProjectCard";
import { icons } from "@/public/assets/icons";
import {
  getAllInvestingInPropertiesAction,
  investingInPropertiesSelector,
} from "@/redux/features/adminpanel/InvestingInProperties/InvestingInProperties.slice";
import { useAppDispatch, useAppSelector } from "@/redux/features/hook";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {};
interface Project {
  _id: string;
  name: string;
  description: string;
  developerName: string;
  address: string;
  neighborhood: string;
  deposit: number;
  numberOfStoreys: number;
  numberOfUnits: number;
  occupancyDate: string;
  maintenanceFees: number;
  pricedFrom: number;
  hashtags: string[];
  categories: string[];
  country: string;

  closingIn: number;
  overViewImages: string[];
  releaseDate: string;
  aboutProject: string;
  aboutImages: string[];
  featuresAndFinishes: string;
  featureImages: string[];
  aboutDeveloper: string;
  developerImages: string[];
  attachments: Attachment[];
  faqs: any[]; // Update this if you have a specific interface for FAQs
  uploadedByAdmin: string;
  auditLogs: any[]; // Update this if you have a specific interface for audit logs
  isSingleFamilyHomeProject: boolean;
  isUpcomingProject: boolean;
  isLaunchedRecently: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  city: string;
}

interface Attachment {
  title: string;
  location: string;
  _id: string;
}

interface FourFilters {
  _id: null;
  location: string[];
  developers: string[];
  occupancyYears: number[];
  deposits: number[];
}

interface Data {
  totalProjectsCount: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  projects: Project[];
  fourFilters: FourFilters[];
}

const page = (props: Props) => {
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [location, setLocation] = useState<String>("");
  const [developer, setDeveloper] = useState<String>("");
  const [occupancy, setOccupancy] = useState<String>("");
  const [deposit, setDeposit] = useState<String>("");
  const [responseData, setResponseDate] = useState<Data>();
  const [paginationNumber, setPaginationNumber] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchName, setSearchName] = useState<string>("");
  const [filterSelected, setFilterSelected] = useState<string>("location");
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const response = await axios.get(
        `/api/v1/projects?page=${currentPage}&limit=16&deposit=${deposit}&occupancyYear=${occupancy}&developer=${developer}&location=${location}&global-search=${searchName}`
      );
      console.log(response.data.data);
      setResponseDate(() => response.data.data);
      setLoading(false);
      return response.data.data;
    };
    fetch().then((res) => {
      console.log(res.currentPage, res.totalPages);
      let pagination: number[] = [];
      for (
        let index = res.currentPage - 1;
        index <= res.currentPage + 1;
        index++
      ) {
        if (index < 1) {
          continue;
        }

        if (index > res.totalPages) {
          break;
        }
        pagination.push(index);
      }
      setPaginationNumber(() => pagination);
    });
  }, [location, developer, occupancy, deposit, currentPage, searchName]);
  console.log(responseData?.currentPage);
  console.log(paginationNumber);
  console.log(currentPage === responseData?.currentPage);
  const dispatch = useAppDispatch();

  const { status, invProps } = useAppSelector(investingInPropertiesSelector);
  useEffect(() => {
    dispatch(getAllInvestingInPropertiesAction());
  }, []);
  return (
    <section className=" ">
      <div className="section-padding">
        <div className="flex justify-between items-stretch my-6 lg:px-[7.25rem]">
          <div className=" p-3 flex justify-start w-[80%] md:w-full items-center gap-2 border-[1px] border-tertiary rounded   relative">
            <div className="w-5 h-5 object-cover ">
              <Image
                src={"/assets/other/search-icon.svg"}
                alt="search-icon"
                width={20}
                height={20}
                className="w-full h-full"
              />
            </div>
            <input
              type="text"
              name="global-search"
              id=""
              value={searchName}
              onChange={(e) => {
                e.preventDefault();
                setSearchName(() => e.target.value);
              }}
              placeholder="Search by Condo Name, Location, Developer etc"
              className="outline-none w-full placeholder:text-sm placeholder:leading-5 placeholder:font-normal md:placeholder:text-base"
            />
          </div>
          <div
            onClick={() => setShowFilters(() => true)}
            className=" md:hidden rounded  object-cover p-2 w-11 border border-tertiary"
          >
            <Image
              src={"/assets/projects/filter.svg"}
              alt="img"
              width={24}
              height={24}
              className="w-full h-full "
            />
          </div>
        </div>
        <div className="space-y-4 lg:px-[7.25rem]">
          <h4 className="text-primary font-medium text-base leading-5 lg:text-[40px] lg:leading-[56px]">
            {" "}
            New Condos in {location === "" ? "All" : location}
          </h4>
          <p className="hidden md:block text-lg leading-5 w-[98%] ">
            Browse our list of upcoming and currently available Toronto condos.
            Filter by developer, neighborhood, estimated occupancy date, or
            deposit required before occupancy.
          </p>
        </div>
        <div className="filters mt-12 hidden md:grid grid-cols-4 w-full md:gap-3 lg:gap-6 lg:px-[7.25rem]">
          <div className="w-full flex flex-col gap-2 justify-between items-center">
            <label htmlFor="location" className="w-full text-tertiary">
              Search by Location
            </label>

            <select
              name="location"
              id="location"
              className="w-full minimal p-3 border border-tertiary rounded"
              onChange={(event) => {
                const selectedValue = event.target.value;
                setLocation(() => selectedValue);
              }}
            >
              <option value={""} className="">
                All
              </option>

              {responseData?.fourFilters?.[0].location.map(
                (location, index) => (
                  <option value={location} key={index} className="">
                    {location}
                  </option>
                )
              )}
            </select>
          </div>
          <div className="w-full flex flex-col gap-2 justify-between items-center">
            <label htmlFor="developer" className="w-full text-tertiary">
              Search by Developer
            </label>

            <select
              name="developer"
              id="developer"
              className="w-full p-3 border minimal border-tertiary rounded"
              onChange={(event) => {
                const selectedValue = event.target.value;
                setDeveloper(() => selectedValue);
              }}
            >
              <option value={""}>All</option>

              {responseData?.fourFilters?.[0].developers.map((developer) => (
                <option value={developer}>{developer}</option>
              ))}
            </select>
          </div>
          <div className="w-full flex flex-col gap-2 justify-between items-center">
            <label htmlFor="occupancy" className="w-full text-tertiary">
              Search by Occupancy Year
            </label>

            <select
              name="occupancy"
              id="occupancy"
              className="w-full p-3 border minimal border-tertiary rounded"
              onChange={(event) => {
                const selectedValue = event.target.value;
                setOccupancy(() => selectedValue);
              }}
            >
              <option value={""}>All</option>

              {responseData?.fourFilters?.[0].occupancyYears.map(
                (occupancyYear) => (
                  <option value={occupancyYear}>{occupancyYear}</option>
                )
              )}
            </select>
          </div>
          <div className="w-full flex flex-col gap-2 justify-between items-center">
            <label htmlFor="deposit" className="w-full text-tertiary">
              Search by Deposit
            </label>

            <select
              name="deposit"
              id="deposit"
              className="w-full p-3 border minimal border-tertiary rounded"
              onChange={(event) => {
                const selectedValue = event.target.value;
                setDeposit(() => selectedValue);
              }}
            >
              <option value={""}>All</option>

              {responseData?.fourFilters?.[0].deposits.map((deposit) => (
                <option value={deposit}>{deposit}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid-container mt-6 lg:mt-[40px]">
          {responseData?.projects.map((project) => (
            <ProjectCard data={project} key={project._id} />
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

        <div className="w-full mt-8 lg:mt-10 flex justify-center items-center ">
          {paginationNumber.length === 0 && (
            <p className="text-tertiary w-full text-center text-base font-light text-ellipsis  md:text-lg lg:text-xl">
              Result Not Found
            </p>
          )}
          {paginationNumber.length !== 0 && (
            <div className="flex justify-center items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  currentPage > 1 && setCurrentPage(() => currentPage - 1)
                }
                disabled={currentPage === 1}
              >
                <Image
                  src={"/assets/other/paginate.svg"}
                  alt="img"
                  className="rotate-180"
                  width={37}
                  height={37}
                />
              </button>
              <div className="flex justify-between items-center gap-1">
                {paginationNumber.length !== 0 &&
                  paginationNumber.map((paginate) => (
                    <div
                      className={` w-10 h-10 flex justify-center rounded-full items-center text-xl cursor-pointer leading-5  ${
                        paginate === responseData?.currentPage
                          ? " text-white bg-primary"
                          : " border-tertiary border-[1px] text-tertiary "
                      }`}
                      onClick={() => setCurrentPage(() => paginate)}
                    >
                      <p>{paginate}</p>
                    </div>
                  ))}
              </div>
              <button
                type="button"
                onClick={() =>
                  currentPage < (responseData?.totalPages || 1) &&
                  setCurrentPage(() => currentPage + 1)
                }
                disabled={currentPage === responseData?.totalPages}
              >
                <Image
                  src={"/assets/other/paginate.svg"}
                  alt="img"
                  className=""
                  width={37}
                  height={37}
                />
              </button>
            </div>
          )}
        </div>
      </div>
      {invProps.map((property) => (
        <div
          key={property._id}
          className="section-padding flex flex-col justify-between items-start gap-5"
        >
          <h5 className="project-details-heading  ">{property.title}</h5>
          <div className="flex flex-col lg:flex-row justify-between items-center gap-5 ">
            <div
              dangerouslySetInnerHTML={{ __html: property.description }}
              className="flex flex-col justify-between items-start gap-5 self-center"
            />

            {property.imageSrc && (
              <div
                className={`w-full h-[358px] lg:h-[535px]  object-cover object-center ${
                  property.isImageRightSide
                    ? " order-first lg:order-last "
                    : " order-last lg:order-first "
                } `}
              >
                <Image
                  src={property.imageSrc}
                  alt="img"
                  className="w-full h-full"
                  width={358}
                  height={358}
                />
              </div>
            )}
          </div>
        </div>
      ))}

      {showFilters && (
        <div className="z-10  h-screen scrollbar-prop fixed inset-0 bg-black  bg-opacity-30 flex justify-center items-center ">
          <div className="bg-white w-full max-w-2xl  absolute left-0 right-0 bottom-0 rounded-t-3xl">
            <div className="flex justify-end w-full sticky top-0 p-2">
              <button
                onClick={() => setShowFilters(false)}
                className="absolute left-1/2 transform -translate-x-1/2 -top-[300%] bg-black rounded-full p-2"
              >
                <Image
                  src={icons.closeBtn}
                  height={24}
                  width={24}
                  alt="Close"
                />
              </button>
            </div>

            <div className="max-h-[90vh]  overflow-y-auto scrollbar-thin scrollbar-thumb-primary text-black">
              <h5 className="text-lg leading-7 text-left p-4 border-[1px] border-transparent border-b-tertiary ">
                Filter
              </h5>
              <div className="flex justify-between w-full items-stretch ">
                <div className="basis-[30%] flex flex-col border-[0.5px] border-transparent border-r-tertiary">
                  <button
                    type="button"
                    onClick={() => setFilterSelected("location")}
                    className={` w-full text-sm leading-5 px-4 py-3 ${
                      filterSelected === "location"
                        ? "bg-primary bg-opacity-30 text-primary "
                        : " text-tertiary "
                    } `}
                  >
                    Location
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterSelected("developer")}
                    className={` border-[0.5px] border-t-tertiary w-full text-sm leading-5 px-4 py-3 ${
                      filterSelected === "developer"
                        ? "bg-primary bg-opacity-30 text-primary "
                        : " text-tertiary "
                    } `}
                  >
                    Developer
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterSelected("occupancyYear")}
                    className={` border-[0.5px] whitespace-nowrap border-t-tertiary w-full text-sm leading-5 px-4 py-3 ${
                      filterSelected === "occupancyYear"
                        ? "bg-primary bg-opacity-30 text-primary "
                        : " text-tertiary "
                    } `}
                  >
                    Occupancy Year
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterSelected("deposit")}
                    className={` border-[0.5px] border-t-tertiary w-full text-sm leading-5 px-4 py-3 ${
                      filterSelected === "deposit"
                        ? "bg-primary bg-opacity-30 text-primary "
                        : " text-tertiary "
                    } `}
                  >
                    Deposit
                  </button>
                  <div className="h-[200px]"></div>
                </div>
                <div className="basis-[69%] flex flex-col self-start">
                  {filterSelected === "location" &&
                    responseData?.fourFilters?.[0].location.map(
                      (locationText) => (
                        <button
                          key={locationText}
                          type="button"
                          className={`px-4 py-3 text-sm text-left leading-[21px]  ${
                            locationText === location
                              ? " bg-primary text-white "
                              : "text-tertiary"
                          }`}
                          onClick={() => setLocation(() => locationText)}
                        >
                          {locationText}
                        </button>
                      )
                    )}
                  {filterSelected === "developer" &&
                    responseData?.fourFilters?.[0].developers.map(
                      (developerText) => (
                        <button
                          key={developerText}
                          type="button"
                          className={`px-4 py-3 text-sm text-left leading-[21px]  ${
                            developerText === developer
                              ? " bg-primary text-white "
                              : "text-tertiary"
                          }`}
                          onClick={() => setDeveloper(() => developerText)}
                        >
                          {developerText}
                        </button>
                      )
                    )}
                  {filterSelected === "occupancyYear" &&
                    responseData?.fourFilters?.[0].occupancyYears.map(
                      (occupancyYearText) => (
                        <button
                          key={occupancyYearText}
                          type="button"
                          className={`px-4 py-3 text-sm text-left leading-[21px]  ${
                            occupancyYearText.toString() === occupancy
                              ? " bg-primary text-white "
                              : "text-tertiary"
                          }`}
                          onClick={() =>
                            setOccupancy(() => {
                              console.log(occupancyYearText, occupancy);

                              return occupancyYearText.toString();
                            })
                          }
                        >
                          {occupancyYearText}
                        </button>
                      )
                    )}
                  {filterSelected === "deposit" &&
                    responseData?.fourFilters?.[0].deposits.map(
                      (depositText) => (
                        <button
                          key={depositText}
                          type="button"
                          className={`px-4 py-3 text-sm text-left leading-[21px]  ${
                            depositText.toString() === deposit
                              ? " bg-primary text-white "
                              : "text-tertiary"
                          }`}
                          onClick={() =>
                            setDeposit(() => {
                              console.log(depositText, deposit);

                              return depositText.toString();
                            })
                          }
                        >
                          {depositText}
                        </button>
                      )
                    )}
                </div>
              </div>
              <div className="w-full basis-[100%] flex justify-between items-stretch py-4 px-10">
                <button
                  className="basis-[30%] text-left text-primary text-base leading-6"
                  onClick={() => {
                    setLocation("");
                    setDeposit("");
                    setDeveloper("");
                    setOccupancy("");
                  }}
                >
                  Clear All
                </button>
                <button
                  className="basis-[70%] primary-button"
                  onClick={() => setShowFilters(false)}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default page;
