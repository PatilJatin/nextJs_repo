import EditPodcastPage from "@/components/pages/adminpanel/EditPodcastPage";
import Header from "@/components/shared/header/Header";
import React from "react";

const EditPodcast = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <>
      <Header
        description="Edit podcast here"
        heading={`Edit Podcast`}
        backBtn="/adminpanel/podcasts"
      ></Header>

      <div className="border-b border-tertiary mb-8"></div>

      <EditPodcastPage id={id} />
    </>
  );
};

export default EditPodcast;
