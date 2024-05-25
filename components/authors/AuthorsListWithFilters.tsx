"use client";

import React, { ChangeEvent, useEffect } from "react";
import OutlinedButton from "../shared/buttons/OutlinedButton";
import { FaChevronDown } from "react-icons/fa6";
import PrimarySpinner from "../shared/loaders/PrimarySpinner";
import AuthorsList from "./AuthorsList";
import SearchBar from "../shared/filters/SearchBar";
import { useAppDispatch, useAppSelector } from "@/redux/features/hook";
import {
  authorsSelector,
  filterBySearch,
  getAllAuthorsAction,
} from "@/redux/features/adminpanel/authors/authors.slice";

const AuthorsListWithFilters = () => {
  const dispatch = useAppDispatch();
  const { filteredAuthors, status } = useAppSelector(authorsSelector);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(filterBySearch(e.target.value));
  };

  useEffect(() => {
    dispatch(getAllAuthorsAction());
  }, []);

  return (
    <>
      <div className="mb-5 flex items-center gap-5">
        <SearchBar
          onChange={handleSearch}
          placeholder="Search by author name"
        />
        <div className="flex-shrink-0 hidden">
          <OutlinedButton colorType="primary" type="button">
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
        <AuthorsList authors={filteredAuthors} />
      )}
    </>
  );
};

export default AuthorsListWithFilters;
