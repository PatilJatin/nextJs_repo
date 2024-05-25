import React from "react";
import PodcastCart from "./PodcastCart";
import Link from "next/link";

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

type Props = {
  podcastCategory: string;
  podcasts: Podcast[];
};

function PodcastSection(props: Props) {
  return (
    <div className="flex flex-col justify-start gap-10 ">
      <p className="text-primary font-medium text-2xl lg:text-[32px] leading-[36px] md:leading-10">
        {props.podcastCategory}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {props.podcasts.slice(0, 4).map((podcast, index) => (
          <PodcastCart
            key={index}
            podcastDescription={podcast.about}
            podcastId={podcast._id}
            podcastImg={podcast.bannerUrl}
          />
        ))}
      </div>
      <Link
        href={`/result-for-podcast/${props.podcastCategory}`}
        className="primary-button self-center"
      >
        View All
      </Link>
    </div>
  );
}

export default PodcastSection;
