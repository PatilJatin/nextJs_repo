import { Metadata } from "next";
import React from "react";
import PodcastsPage from "@/components/pages/client/Podcast";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.PRODUCTION_URL || "https://wip.condokharido.ca"
  ),
  title: "Condo Kharido | Podcasts",

  description:
    "Search for new condos, upcoming projects, and browse through insightful podcasts and blogs. Let Sanjay Gupta guide you to your dream home.",

  openGraph: {
    title: "Condo Kharido | Podcasts",
    description:
      "Search for new condos, upcoming projects, and browse through insightful podcasts and blogs. Let Sanjay Gupta guide you to your dream home.",
    images: [
      {
        url: "/assets/opengraph.png",
        width: 800,
        height: 600,
        alt: "Condo Kharido",
      },
    ],
  },
};

function Podcasts() {
  return <PodcastsPage />;
}

export default Podcasts;
