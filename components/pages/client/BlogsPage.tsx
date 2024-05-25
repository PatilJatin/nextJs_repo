"use client";
import BlogCart from "@/components/blogs/BlogCart";
import GlobalSearch from "@/components/reusable/GlobalSearch";
import {
  blogSelector,
  getAllBlogsAction,
} from "@/redux/features/adminpanel/blog/blogs.slice";
import { useAppDispatch, useAppSelector } from "@/redux/features/hook";
import { BLOG_MODEL } from "@/types/blogs.types";
import axios from "axios";
import Image from "next/image";

import React, { useEffect, useState } from "react";
interface Author {
  _id: string;
  name: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Blog {
  _id: string;
  title: string;
  authorId: Author;
  about: string;
  bannerUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface BlogResponse {
  data: {
    totalBlogsCount: number;
    totalPages: number;
    currentPage: number;
    limit: number;
    blogs: Blog[];
  };
}

const BlogsPage = () => {
  let Blogs: BLOG_MODEL[] = [];
  const dispatch = useAppDispatch();
  const { status, blogs } = useAppSelector(blogSelector);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginationNumber, setPaginationNumber] = useState<number[]>([]);
  const [responseData, setResponseDate] = useState<BlogResponse>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Dispatch the action and wait for its completion
        const response = await axios.get(
          `/api/v1/admins/blogs?limit=3&page=${currentPage}`
        );
        // Now you can work with the response

        setResponseDate(response.data);
        setLoading(false);
        Blogs = response.data.data.blogs;

        return response.data;
      } catch (error) {
        console.error("Error fetching podcast data:", error);
      }
    };

    fetchData().then((res) => {
      console.log(res);
      let pagination: number[] = [];
      for (
        let index = res.data.currentPage - 1;
        index <= res.data.currentPage + 1;
        index++
      ) {
        if (index < 1) {
          continue;
        }

        if (index > res.data.totalPages) {
          break;
        }
        pagination.push(index);
      }
      console.log(pagination);

      setPaginationNumber(() => pagination);
    });
  }, [currentPage]);

  return (
    <div className="section-padding">
      <GlobalSearch />
      <div>
        {responseData?.data.blogs.map((blog, index) => (
          <div className="w-full lg:w-[70%] mx-auto">
            <BlogCart
              key={index}
              authorName={blog.authorId?.name || "NA"}
              blogDescription={blog.about}
              blogId={blog._id}
              blogImg={blog.bannerUrl}
              blogPostedDate={blog.createdAt.split("T")[0]}
              blogTitle={blog.title}
            />
            <hr className=" my-10 lg:my-[40px] bg-tertiary h-[1px] border-tertiary" />
          </div>
        ))}
        {loading && (
          <div className=" w-full lg:w-[70%] mx-auto flex flex-col justify-start gap-8 lg:gap-10 ">
            <div>
              <div className="w-3/4 h-6 bg-gradient-to-r from-gray-300 to-gray-200 mb-2 rounded"></div>
              <div className="w-1/2 h-4 bg-gradient-to-r from-gray-300 to-gray-200 rounded"></div>
            </div>
            <div className="w-full h-[326px] lg:h-[536px] bg-gradient-to-r from-gray-300 to-gray-200 rounded"></div>
            <div className="flex flex-col gap-5">
              <div className="w-full h-4 bg-gradient-to-r from-gray-300 to-gray-200 rounded"></div>
              <div className="w-full h-4 bg-gradient-to-r from-gray-300 to-gray-200 rounded"></div>
              <div className="w-full h-4 bg-gradient-to-r from-gray-300 to-gray-200 rounded"></div>
              <div className="w-3/4 h-8 bg-gradient-to-r from-gray-300 to-gray-200 rounded"></div>
            </div>
          </div>
        )}
        <div className="w-full mt-8 lg:mt-10 flex justify-center items-center">
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
                  width={41}
                  height={41}
                />
              </button>
              <div className="flex justify-between items-center gap-1">
                {paginationNumber.length !== 0 &&
                  paginationNumber.map((paginate) => (
                    <div
                      className={` w-12 h-12 flex justify-center rounded-full items-center text-xl cursor-pointer leading-5  ${
                        paginate === responseData?.data.currentPage
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
                  currentPage < (responseData?.data.totalPages || 1) &&
                  setCurrentPage(() => currentPage + 1)
                }
                disabled={currentPage === responseData?.data.totalPages}
              >
                <Image
                  src={"/assets/other/paginate.svg"}
                  alt="img"
                  className=""
                  width={41}
                  height={41}
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;
