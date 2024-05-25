"use client";
import PodcastListWithFilters from "@/components/podcasts/PodcastListWithFilters";
import PrimaryButton from "@/components/shared/buttons/PrimaryButton";
import Header from "@/components/shared/header/Header";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Toaster } from "react-hot-toast";

const Podcasts = () => {
  const { data } = useSession();

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <Header
        description="Welcome to podcasts list page"
        heading={`Hello, ${
          data?.user.isSuperAdmin ? "Super Admin!" : "Admin!"
        } `}
      >
        <Link href={`/adminpanel/podcasts/newPodcast`}>
          <PrimaryButton>Add Podcast</PrimaryButton>
        </Link>
      </Header>
      {/* todo:add search tab */}

      {/* <PodcastsTable podcasts={filteredPodcasts} /> */}
      <PodcastListWithFilters />
      <Toaster />
    </div>
  );
};

export default Podcasts;
