"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import SearchBar from "../shared/filters/SearchBar";
import PropertiesListTable from "./PropertiesListTable";
import { useAppDispatch, useAppSelector } from "@/redux/features/hook";
import {
  filterBySearch,
  filterPropertyByCategoryAction,
  filterPropertyByClosingInAction,
  getAllPropertiesAction,
  propertiesSelector,
} from "@/redux/features/adminpanel/properties/properties.slice";
import OutlinedButton from "../shared/buttons/OutlinedButton";
import { FaChevronDown } from "react-icons/fa6";
import PrimarySpinner from "../shared/loaders/PrimarySpinner";
import FiltersDiv from "../shared/filters/FiltersDiv";

type ActiveFilters = "Closing In" | "Category";

const PropertiesListWithFilters = () => {
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<ActiveFilters>("Closing In");

  const dispatch = useAppDispatch();
  const { projects, status, filteredProjects } =
    useAppSelector(propertiesSelector);

  useEffect(() => {
    dispatch(getAllPropertiesAction());
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);

    dispatch(filterBySearch(e.target.value));
  };

  const filterItems: ActiveFilters[] = ["Closing In", "Category"];

  const allCategories: string[] = Array.from(
    new Set(projects.flatMap((project) => project.categories))
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
    dispatch(filterPropertyByCategoryAction(filter));
  };

  const filterByClosingIn = (year: number) => {
    dispatch(filterPropertyByClosingInAction(year));
  };

  return (
    <>
      <div className="mb-5 flex items-center gap-5">
        <SearchBar
          onChange={handleSearch}
          placeholder="Search by property name, location"
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
            <div className="flex w-full">
              <ul className="w-1/2 border-r border-tertiary">
                {filterItems.map((item: ActiveFilters, index) => (
                  <li
                    key={index}
                    onClick={() => setActiveFilter(item)}
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
              <div className="w-1/2  max-h-40 overflow-y-auto">
                {activeFilter === "Category" &&
                  allCategories.map((item) => (
                    <div
                      onClick={() => filterByCategory(item)}
                      key={item}
                      className="py-3 px-6 text-xs flex items-center gap-3 fo"
                    >
                      {/* {item} */}
                      <input id={item} type="radio" name={item} />
                      <label className="capitalize" htmlFor={item}>
                        {item}
                      </label>
                    </div>
                  ))}

                {activeFilter === "Closing In" &&
                  closingIn.map((item) => (
                    <div
                      onClick={() => filterByClosingIn(item.value)}
                      key={item.value}
                      className="py-3 px-6 text-xs flex items-center gap-3 fo"
                    >
                      {/* {item} */}
                      <input id={item.year} type="radio" name={"year"} />
                      <label className="capitalize" htmlFor={item.year}>
                        {item.year}
                      </label>
                    </div>
                  ))}
              </div>
            </div>
          </FiltersDiv>
        </div>
      </div>

      {status === "loading" ? (
        <PrimarySpinner />
      ) : (
        <PropertiesListTable properties={filteredProjects} />
      )}
    </>
  );
};

export default PropertiesListWithFilters;
