"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

interface SearchResultData {
  blogs: {
    count: number;
    data: {
      _id: string;
      title: string;
    }[];
    totalPages: number;
  };
  podcasts: {
    count: number;
    data: {
      _id: string;
      name: string;
    }[];
    totalPages: number;
  };
  projects: {
    count: number;
    data: {
      _id: string;
      name: string;
    }[];
    totalPages: number;
  };
  currentPage: number;
}

const GlobalSearch = () => {
  const [searchResults, setSearchResults] = useState<SearchResultData | null>(
    null
  );
  const [query, setQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    if (query.trim() !== "") {
      debounceTimeout.current = setTimeout(() => {
        handleSearch();
      }, 300); // Adjust the debounce time here (in milliseconds)
    } else {
      setSearchResults(null); // Clear search results if query is empty
    }

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [query]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/v1/global-search?query=${query}`);
      setSearchResults(response.data.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  // Function to handle click outside of dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        // Clicked outside the dropdown, set searchResults to null
        setSearchResults(null);
      }
    };

    // Add event listener to detect clicks outside of dropdown
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  console.log(searchResults);

  return (
    <div className=" w-full lg:w-[85%] mx-auto p-3 flex justify-start items-center gap-2 border-[1px] border-tertiary rounded my-6 lg:my-10 relative">
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
        placeholder="Search by Condo, Location, Developer, Blogs and podcasts."
        className="outline-none w-full placeholder:text-sm placeholder:leading-5 placeholder:font-normal md:placeholder:text-base"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {searchResults && (
        <div
          ref={dropdownRef}
          className="absolute w-full bg-white h-10 left-0 right-0 top-[100%] border-[1px] border-tertiary z-[100]"
        >
          {searchResults.projects.count > 0 && (
            <div className="bg-white">
              <p className="bg-primary py-4 w-full text-white pl-10 uppercase">
                projects
              </p>
              {searchResults.projects.data.map((project) => (
                <div
                  key={project._id}
                  className={`first-line:w-full px-3 py-2 flex justify-between bg-tertiary bg-opacity-10 hover:bg-opacity-30 items-center text-black  pl-14`}
                >
                  <Link href={`/project/${project._id}`} className="capitalize">
                    {project.name}
                  </Link>
                </div>
              ))}
            </div>
          )}
          {searchResults.blogs.count > 0 && (
            <div className="bg-white">
              <p className="bg-primary py-4 w-full text-white pl-10 uppercase">
                Blogs
              </p>
              {searchResults.blogs.data.map((blog) => (
                <div
                  key={blog._id}
                  className="w-full px-3 py-2 flex justify-between bg-tertiary bg-opacity-10 items-center hover:bg-opacity-30  text-black  pl-14"
                >
                  <Link href={`/blogs/${blog._id}`} className="capitalize">
                    {blog.title}
                  </Link>
                </div>
              ))}
            </div>
          )}
          {searchResults.podcasts.count > 0 && (
            <div className="bg-white">
              <p className="bg-primary py-4 w-full text-white pl-10 uppercase">
                podcasts
              </p>
              {searchResults.podcasts.data.map((podcast) => (
                <div
                  key={podcast._id}
                  className="w-full px-3 py-2 flex justify-between bg-tertiary bg-opacity-10 items-center hover:bg-opacity-30  text-black  pl-14"
                >
                  <Link
                    href={`/podcasts/${podcast._id}`}
                    className="capitalize"
                  >
                    {podcast.name}
                  </Link>
                </div>
              ))}
            </div>
          )}
          {searchResults.podcasts.count === 0 &&
            searchResults.blogs.count === 0 &&
            searchResults.projects.count === 0 && (
              <p className="text-primary text-base lg:text-lg text-left pl-2">
                No results!
              </p>
            )}
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
