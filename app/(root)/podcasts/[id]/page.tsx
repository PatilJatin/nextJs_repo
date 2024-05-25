import PodcastDetailedPage from "@/components/pages/client/PodcastById";
import React from "react";

type Props = {};

function page({ params }: { params: { id: string } }) {
  return (
    <div>
      <PodcastDetailedPage id={params.id} />
    </div>
  );
}

export default page;
