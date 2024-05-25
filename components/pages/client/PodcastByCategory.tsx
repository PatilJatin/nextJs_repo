"use client";
import PodcastCart from "@/components/podcasts/PodcastCart";
import PrimarySpinner from "@/components/shared/loaders/PrimarySpinner";
import { getAllPodcastListByCategoryAction } from "@/redux/features/adminpanel/podcasts/podcasts.slice";
import { useAppDispatch } from "@/redux/features/hook";
import React, { useEffect, useState } from "react";

type Props = {
  category: string;
};
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

const PodcastByCategory = (props: Props) => {
  const dispatch = useAppDispatch();
  console.log(props.category);
  const [loading, setLoading] = useState<boolean>(false);
  const [podcastList, setPodcastList] = useState<Podcast[]>([]);
  const [displayedItems, setDisplayedItems] = useState(4); //set to 12

  const allItems = podcastList.length;

  const handleLoadMore = () => {
    const remainingItems = allItems - displayedItems;
    const nextDisplayCount = Math.min(4, remainingItems);

    setDisplayedItems((prev) => prev + nextDisplayCount);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(() => true);

        // Dispatch the action and wait for its completion
        const response = await dispatch(
          getAllPodcastListByCategoryAction(props.category)
        );
        // Now you can work with the response
        console.log(response.payload.data);
        setPodcastList(response.payload.data.podcasts);
        setLoading(() => false);
      } catch (error) {
        console.log("error");

        console.error("Error fetching podcast data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(displayedItems, allItems);

  return (
    <div className="section-padding flex flex-col justify-start gap-3 lg:gap-10 mt-6 lg:mt-10">
      <div className="flex flex-col gap-1 lg:gap-4 justify-start">
        <h3 className="text-2xl leading-8 font-medium text-primary">
          {props.category}
        </h3>
        <p className="text-xs lg:text-lg  leading-4 lg:leading-6 font-normal text-tertiary">
          {displayedItems >= allItems ? allItems : displayedItems} of {allItems}{" "}
          results
        </p>
      </div>
      {loading && (
        <div className="w-full flex justify-center items-center">
          <PrimarySpinner />
        </div>
      )}
      <div className="grid-container">
        {podcastList.slice(0, displayedItems).map((podcast) => (
          <PodcastCart
            key={podcast._id}
            podcastDescription={podcast.about}
            podcastId={podcast._id}
            podcastImg={podcast.bannerUrl}
          />
        ))}
      </div>
      <div className="w-full flex justify-center items-center ">
        {!(displayedItems >= allItems) && (
          <button onClick={handleLoadMore} className="primary-button">
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default PodcastByCategory;
