"use client";
import PodcastSection from "@/components/podcasts/PodcastSection";
import GlobalSearch from "@/components/reusable/GlobalSearch";
import PrimarySpinner from "@/components/shared/loaders/PrimarySpinner";
import { getAllPodcastsWithCategoryAction } from "@/redux/features/adminpanel/podcasts/podcasts.slice";
import { useAppDispatch } from "@/redux/features/hook";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Podcast = {
  _id: string;
  name: string;
  category: string;
  about: string;
  bannerUrl: string;
  audioTitle: string;
  audioUrl: string;
  spotifyPodcastLink?: string;
  appleMusicPodcastLink?: string;
  googleMusicPodcastLink?: string;
  stitcherPodcastLink?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type podcasts = {
  categoryName: string;
  podcasts: Podcast[];
};

function PodcastsPage() {
  const [podcasts, setPodcasts] = useState<podcasts[]>([]);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(() => true);

        // Dispatch the action and wait for its completion
        const response = await dispatch(getAllPodcastsWithCategoryAction());
        // Now you can work with the response
        console.log(response.payload.data);
        setPodcasts(response.payload.data);
        setLoading(() => false);
      } catch (error) {
        console.error("Error fetching podcast data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="section-padding">
      <GlobalSearch />

      <div className="flex flex-col gap-[90px] md:gap-[120px]">
        <div className="flex flex-col md:flex-row justify-between items-stretch  gap-3 md:gap-10">
          <div className="flex flex-col justify-between items-start gap-1 md:gap-4 py-0 md:py-[72px] w-full md:w-[40%]">
            <h4 className="font-medium text-xl md:text-[40px] leading-8 md:leading-[56px] text-primary">
              Elevate Your Condo Investment Game
            </h4>
            <p className="home-section-para mt-1">
              Gain expert insights and strategies for successful condo market
              investing with Sanjay Gupta on the True Condos Podcast
            </p>
            <Link href={"/podcasts"} className="primary-button mt-3">
              {" "}
              Listen Now
            </Link>
          </div>
          <div className="w-full md:w-[50%] object-cover  h-[220px] md:h-[420px]">
            <Image
              src={"/assets/home/other/investment-ref.svg"}
              alt="img"
              className="w-full h-full object-cover"
              width={500}
              height={400}
            />
          </div>
        </div>
        {podcasts.slice(0, 4).map((podcasts, index) => (
          <PodcastSection
            key={index}
            podcasts={podcasts.podcasts}
            podcastCategory={podcasts.categoryName}
          />
        ))}
        {loading && (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="w-full sm:border-tertiary border-[0.5px] rounded md:p-4 flex flex-col gap-3"
              >
                <div className="w-full min-h-[269px] lg:h-[200px] bg-gradient-to-r from-gray-300 to-gray-200 rounded overflow-clip"></div>
                <div className="font-normal font-Poppins text-base line-clamp-6 leading-7 bg-gradient-to-r from-gray-300 to-gray-200"></div>
                <div className="underline font-medium text-sm md:text-base leading-5 self-start mt-1 text-primary bg-gradient-to-r from-gray-300 to-gray-200"></div>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}

export default PodcastsPage;
