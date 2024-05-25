"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import SearchBar from "../shared/filters/SearchBar";
import { useAppDispatch, useAppSelector } from "@/redux/features/hook";
import OutlinedButton from "../shared/buttons/OutlinedButton";
import { FaChevronDown } from "react-icons/fa6";
import PrimarySpinner from "../shared/loaders/PrimarySpinner";
import FiltersDiv from "../shared/filters/FiltersDiv";

import axios from "axios";
import {
  blogSelector,
  filterBySearch,
  getAllBlogsAction,
} from "@/redux/features/adminpanel/blog/blogs.slice";
import BlogsTable from "./BlogTable";

const BlogsListWithFilters = () => {
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<string>("Closing In");
  const [categories, setCategories] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const { status, filteredBlogs } = useAppSelector(blogSelector);

  useEffect(() => {
    dispatch(getAllBlogsAction());
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(filterBySearch(e.target.value));
  };

  // FILTERS
  console.log(filteredBlogs);

  return (
    <>
      <div className="mb-5 flex items-center gap-5">
        <SearchBar
          onChange={handleSearch}
          placeholder="Search by blog name, author name"
        />
        <div className="flex-shrink-0 relative  hidden">
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
        </div>
      </div>

      {status === "loading" ? (
        <PrimarySpinner />
      ) : (
        <BlogsTable blogs={filteredBlogs} />
      )}
    </>
  );
};

export default BlogsListWithFilters;
