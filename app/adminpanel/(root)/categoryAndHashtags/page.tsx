"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import toast, { Toaster } from "react-hot-toast";
import { getSession } from "next-auth/react";
import Header from "@/components/shared/header/Header";

const EditCategoryForm = () => {
  const [dynamicData, setDynamicData] = useState<any>({
    categories: [],
    hashtags: [],
  });

  const [categoryOptions, setCategoryOptions] = useState<any>([]);
  const [hashtagOptions, setHashtagOptions] = useState<any>([]);
  const [podcastCateOptions, setPodcastCateOptions] = useState<any>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/v1/categories-and-hashtags`);
      console.log(response.data);

      const { propertyCategories, hashtags, podcastCategory } =
        response?.data?.data;
      const session = await getSession();

      setDynamicData({ propertyCategories, hashtags, podcastCategory });
      setCategoryOptions(
        propertyCategories.map((category: any) => ({
          value: category,
          label: category,
        }))
      );
      setHashtagOptions(
        hashtags.map((hashtag: any) => ({
          value: hashtag,
          label: hashtag,
        }))
      );
      setPodcastCateOptions(
        podcastCategory.map((category: any) => ({
          value: category,
          label: category,
        }))
      );
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleCategoryChange = (selectedOptions: any) => {
    const propertyCategories = selectedOptions.map(
      (option: any) => option.value
    );
    setDynamicData((prevData: any) => ({
      ...prevData,
      propertyCategories,
    }));
    setCategoryOptions(
      propertyCategories.map((category: any) => ({
        value: category,
        label: category,
      }))
    );
  };
  const handlePodcastCategoryChange = (selectedOptions: any) => {
    const podcastCategory = selectedOptions.map((option: any) => option.value);
    setDynamicData((prevData: any) => ({
      ...prevData,
      podcastCategory,
    }));
    setPodcastCateOptions(
      podcastCategory.map((category: any) => ({
        value: category,
        label: category,
      }))
    );
  };

  const handleHashtagsChange = (selectedOptions: any) => {
    const hashtags = selectedOptions.map((option: any) => option.value);
    setDynamicData((prevData: any) => ({
      ...prevData,
      hashtags,
    }));
    setHashtagOptions(
      hashtags.map((hashtag: any) => ({
        value: hashtag,
        label: hashtag,
      }))
    );
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      // Prepare the
      const session = await getSession();
      const updateFields = {
        propertyCategories: dynamicData.propertyCategories,
        hashtags: dynamicData.hashtags,
        podcastCategory: dynamicData.podcastCategory,
        // Add other fields as needed
      };

      if (session?.user.access_token) {
        // Send PATCH request to Next.js API route
        try {
          const response = await axios.patch(
            "/api/v1/categories-and-hashtags",
            updateFields,
            {
              headers: {
                Authorization: `Bearer ${session?.user.access_token}`,
              },
            }
          );
          toast.success("Categories & Hashtags updated successfully.");
          console.log("DynamicData updated successfully:", response.data);
        } catch (error) {
          console.error("Error updating DynamicData:", error);
        }
      } else {
        toast.error("Please login to continue.");
      }
    } catch (error) {
      toast.error("Refresh the page.");
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Header
          heading="Categories & hashtags"
          description="Update Categories & hashtags details"
        ></Header>
        <div className="border-b border-tertiary"></div>

        <div className="flex  flex-col md:flex-row justify-between flex-wrap items-center gap-6 py-20 w-full">
          <div className="flex justify-between gap-2 items-center basis-full">
            <label
              htmlFor="category"
              className=" text-base md:text-lg text-black font-medium basis-1/3 text-right "
            >
              Property Categories :-
            </label>
            <CreatableSelect
              isMulti
              options={categoryOptions}
              onChange={handleCategoryChange}
              value={categoryOptions.filter((option: any) =>
                dynamicData.propertyCategories.includes(option.value)
              )}
              className="basis-2/3"
            />
          </div>
          <div className="flex justify-between gap-2 items-center basis-full">
            <label
              htmlFor="hashtags"
              className=" text-lg text-black font-medium basis-1/3 text-right"
            >
              Hashtags :-
            </label>
            <CreatableSelect
              isMulti
              options={hashtagOptions}
              onChange={handleHashtagsChange}
              value={hashtagOptions.filter((option: any) =>
                dynamicData.hashtags.includes(option.value)
              )}
              className="basis-2/3"
            />
          </div>
          <div className="flex justify-between gap-2 items-center basis-full">
            <label
              htmlFor="podcastCate"
              className=" text-lg text-black font-medium basis-1/3 text-right"
            >
              Podcast Categories :-
            </label>
            <CreatableSelect
              isMulti
              options={podcastCateOptions}
              onChange={handlePodcastCategoryChange}
              value={podcastCateOptions.filter((option: any) =>
                dynamicData.podcastCategory.includes(option.value)
              )}
              className="basis-2/3"
            />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button type="submit" className="primary-button ">
            Submit changes
          </button>
        </div>
      </form>
      <Toaster />
    </>
  );
};

export default EditCategoryForm;
