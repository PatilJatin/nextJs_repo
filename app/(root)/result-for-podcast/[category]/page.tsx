import PodcastByCategory from "@/components/pages/client/PodcastByCategory";
import React from "react";

export default function page({ params }: { params: { category: string } }) {
  return (
    <div className="text-black text-5xl">
      <PodcastByCategory category={decodeURIComponent(params.category)} />
    </div>
  );
}
