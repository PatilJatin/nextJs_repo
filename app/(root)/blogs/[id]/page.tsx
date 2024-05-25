"use client";
import GlobalSearch from "@/components/reusable/GlobalSearch";
import PrimarySpinner from "@/components/shared/loaders/PrimarySpinner";
import { getBlogAction } from "@/redux/features/adminpanel/blog/blogs.slice";
import { useAppDispatch } from "@/redux/features/hook";
import { BLOG_RESPONSE } from "@/types/blogs.types";
import { Metadata } from "next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type blogDetails = {
  blogId: number;
  blogTitle: string;
  blogPostedDate: string;
  authorName: string;
  blogImg: string;
  blogDescription: string;
  authorImg: string;
  authorDescription: string;
};

function page({ params }: { params: { id: string } }) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [blogDetailed, setBlogDetailed] = useState<BLOG_RESPONSE>();
  useEffect(() => {
    const fetchData = async () => {
      if (params.id !== "1") {
        await dispatch(getBlogAction(params.id)).then((res) => {
          console.log(res);
          if (!res.payload.data) {
            router.push("/not-found"); // Replace '/not-found' with the actual path to your not-found page
          }
          setBlogDetailed(res.payload.data);
        });
      }
    };
    fetchData();
  }, []);
  console.log(blogDetailed);
  const formatDate = (inputDate: string) => {
    const date = new Date(inputDate);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  };

  let formattedDate = "";
  if (blogDetailed) {
    formattedDate = formatDate(blogDetailed.createdAt.split("T")[0]);
    console.log(formattedDate);
  }
  return (
    <div className="flex flex-col w-full justify-start section-padding">
      <GlobalSearch />
      {blogDetailed && (
        <>
          <div className="flex flex-col w-full gap-8  ">
            <div className="w-full lg:w-[70%] mx-auto">
              <h3 className="font-medium text-2xl lg:text-[40px]  leading-8 lg:leading-[56px] text-primary">
                {blogDetailed.title}
              </h3>
              <p className="text-gray-600 text-xs lg:text-base  font-normal leading-4 lg:leading-4">
                {formattedDate} / by {blogDetailed?.authorId?.name || "NA"} /
                Blog
              </p>
            </div>
            <div className="w-full lg:w-[70%] mx-auto h-[512px] object-cover">
              <Image
                src={blogDetailed.bannerUrl || "/assets/temp/blogImg.svg"}
                alt="blog"
                width={358}
                height={269} // Adjust this to the actual height of your image
                className="w-full h-full "
              />
            </div>

            <p className="text-gray-600 w-full lg:w-[90%] mx-auto font-normal tracking-wide text-lg lg:text-2xl leading-6 lg:leading-8">
              <span dangerouslySetInnerHTML={{ __html: blogDetailed.about }} />
            </p>
          </div>
          <hr className="h-[0.5px] border-tertiary border-[0.5px]  my-10 md:my-32" />
          {blogDetailed.authorId && (
            <div className="flex flex-col md:flex-row justify-start md:items-stretch gap-5">
              <div className="hidden md:block md:w-[6px] bg-primary "></div>
              <div className=" w-[50%] md:w-[20%] max-w-[190px] rounded-sm overflow-clip object-cover">
                <Image
                  src={
                    blogDetailed.authorId?.image || "/assets/temp/author.svg"
                  }
                  width={191}
                  height={202}
                  alt="author-img"
                  className="w-full h-full  "
                />
              </div>
              <div className=" md:w-[70%] lg:w-[90%]  flex flex-col md:justify-between gap-5">
                <p className="text-black font-medium text-xl leading-7 md:text-2xl">
                  Author :{blogDetailed.authorId?.name || "NA"}
                </p>
                <p className="font-normal text-lg leading-6 text-gray-600 md:line-clamp-6">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: blogDetailed.authorId?.description || "NA",
                    }}
                  />
                </p>
              </div>
            </div>
          )}
        </>
      )}

      {!blogDetailed && (
        <>
          <div className="flex flex-col w-full gap-8">
            <div className="w-full lg:w-[70%] mx-auto">
              <div className="w-3/4 h-8 bg-gradient-to-r from-gray-300 to-gray-200 mb-2 rounded"></div>
              <div className="w-1/2 h-4 bg-gradient-to-r from-gray-300 to-gray-200 rounded"></div>
            </div>
            <div className="w-full lg:w-[70%] mx-auto h-[512px] bg-gradient-to-r from-gray-300 to-gray-200 rounded"></div>
            <div className="w-full lg:w-[90%] mx-auto">
              <div className="w-full h-4 bg-gradient-to-r from-gray-300 to-gray-200 rounded"></div>
              <div className="w-full h-4 bg-gradient-to-r from-gray-300 to-gray-200 rounded"></div>
              <div className="w-full h-4 bg-gradient-to-r from-gray-300 to-gray-200 rounded"></div>
              <div className="w-3/4 h-8 bg-gradient-to-r from-gray-300 to-gray-200 rounded"></div>
            </div>
          </div>
          <hr className="h-[0.5px] bg-gray-300 my-10 md:my-32" />
          <div className="flex flex-col md:flex-row justify-start md:items-stretch gap-5">
            <div className="hidden md:block md:w-[6px] bg-primary "></div>
            <div className="w-[50%] md:w-[20%] max-w-[190px] bg-gradient-to-r from-gray-300 to-gray-200 rounded-sm overflow-clip object-cover"></div>
            <div className="md:w-[70%] lg:w-[90%] flex flex-col md:justify-between gap-5">
              <div className="w-3/4 h-8 bg-gradient-to-r from-gray-300 to-gray-200 rounded"></div>
              <div className="w-full h-4 bg-gradient-to-r from-gray-300 to-gray-200 rounded"></div>
              <div className="w-full h-4 bg-gradient-to-r from-gray-300 to-gray-200 rounded"></div>
              <div className="w-3/4 h-8 bg-gradient-to-r from-gray-300 to-gray-200 rounded"></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default page;
