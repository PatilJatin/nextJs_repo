import PodcastFormProvider from "@/components/podcasts/form/PodcastFormProvider";
import Header from "@/components/shared/header/Header";
import React from "react";

const newPodcast = () => {
  return (
    <>
      <Header
        description="Add your new podcast here"
        heading={`New Podcast`}
        backBtn="/adminpanel/podcasts"
      ></Header>

      <div className="border-b border-tertiary mb-8"></div>

      <PodcastFormProvider />
    </>
  );
};

export default newPodcast;
