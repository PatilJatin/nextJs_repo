"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import SearchBar from "../shared/filters/SearchBar";
import { useAppDispatch, useAppSelector } from "@/redux/features/hook";
import OutlinedButton from "../shared/buttons/OutlinedButton";
import { FaChevronDown } from "react-icons/fa6";
import PrimarySpinner from "../shared/loaders/PrimarySpinner";
import FiltersDiv from "../shared/filters/FiltersDiv";
import PodcastsTable from "./PodcastsTable";
import {
  filterBySearch,
  getAllPodcastListByCategoryAction,
  getAllPodcastsAction,
  podcastSelector,
} from "@/redux/features/adminpanel/podcasts/podcasts.slice";
import axios from "axios";

const PropertiesListWithFilters = () => {
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<string>("Closing In");
  const [categories, setCategories] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const { status, filteredPodcasts, podcasts } =
    useAppSelector(podcastSelector);
  const getAllCategory = async () => {
    try {
      const response = await axios.get(`/api/v1/categories-and-hashtags`);
      setCategories(() => response?.data?.data?.podcastCategory);
    } catch (error: any) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    dispatch(getAllPodcastsAction());
    getAllCategory();
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(filterBySearch(e.target.value));
  };

  const allCategories: string[] = Array.from(
    new Set(podcasts.flatMap((podcast) => podcast.category))
  );

  const closingIn = [
    { year: "0 - 1 year", value: 12 },
    { year: "1 year", value: 1 },
    { year: "3 year", value: 3 },
    { year: "5+ year", value: 5 },
    { year: "7+ year", value: 7 },
  ];

  // FILTERS
  const filterByCategory = (filter: string) => {
    // dispatch(filterPropertyByCategoryAction(filter));
    dispatch(getAllPodcastListByCategoryAction(filter));
  };

  const filterByClosingIn = (year: number) => {
    // dispatch(filterPropertyByClosingInAction(year));
  };

  return (
    <>
      <div className="mb-5 flex items-center gap-5">
        <SearchBar
          onChange={handleSearch}
          placeholder="Search by podcast title"
        />
        <div className="flex-shrink-0 relative">
          <OutlinedButton
            onClick={() => setShowFilters(true)}
            colorType="primary"
            type="button"
          >
            <div className="flex items-center gap-2">
              <div>Filter By</div>
              <FaChevronDown />
            </div>
          </OutlinedButton>

          <FiltersDiv show={showFilters} hide={() => setShowFilters(false)}>
            <div className="w-full">
              <ul className="border-r border-tertiary">
                {categories.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setActiveFilter(item);
                      filterByCategory(item);
                    }}
                    className={`${
                      activeFilter === item ? "bg-primary text-white" : ""
                    } ${
                      index === 0 ? "rounded-tl-lg" : ""
                    }  px-5 py-4 text-xs hover:bg-primary hover:text-white border-b border-tertiary`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FiltersDiv>
        </div>
      </div>

      {status === "loading" ? (
        <PrimarySpinner />
      ) : (
        <PodcastsTable podcasts={filteredPodcasts} />
      )}
    </>
  );
};

export default PropertiesListWithFilters;
