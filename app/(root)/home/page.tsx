import CategoryWiseProjects from "@/components/Home/CategoryWiseProjects";
import ClosingInProjects from "@/components/Home/ClosingInProjects";
import FeaturesIn from "@/components/Home/FeaturesIn";
import HeroSection from "@/components/Home/HeroSection";
import HomeBanners from "@/components/Home/HomeBanners";
import LunchedProjects from "@/components/Home/LunchedProjects";
import PageNav from "@/components/Home/PageNav";
import UpComingProjects from "@/components/Home/UpComingProjects";
import GlobalSearch from "@/components/reusable/GlobalSearch";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.PRODUCTION_URL || "https://wip.condokharido.ca"
  ),
  title: "Condo Kharido | Home",

  description:
    "Search for new condos, upcoming projects, and browse through insightful podcasts and blogs. Let Sanjay Gupta guide you to your dream home.",

  openGraph: {
    title: "Condo Kharido | Home",
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

const Home = () => {
  return (
    <section className="main-section">
      <div className="px-4 lg:px-9">
        <GlobalSearch />
      </div>
      <HeroSection />
      <PageNav />
      <LunchedProjects />
      <CategoryWiseProjects />
      <ClosingInProjects />
      <UpComingProjects />
      <HomeBanners />
      <FeaturesIn />
    </section>
  );
};

export default Home;
