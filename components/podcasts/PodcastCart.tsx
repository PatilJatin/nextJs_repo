import Image from "next/image";
import Link from "next/link";
import React from "react";

type Podcast = {
  podcastId: string;
  podcastDescription: string;
  podcastImg: string;
};

const PodcastCart = (props: Podcast) => {
  let cleanedHTML = props.podcastDescription.replace(
    /<img[^>]*>|<video[^>]*>/g,
    ""
  );
  return (
    <div className="w-full  sm:border-tertiary border-[0.5px] rounded  md:p-4 flex flex-col gap-3">
      <div className="w-full min-h-[269px] lg:h-[200px] object-cover rounded overflow-clip">
        <Image
          src={props.podcastImg || "/assets/temp/blogImg.svg"}
          alt={props.podcastImg}
          width={278}
          height={200}
          className="w-full h-full "
        />
      </div>
      <p className="font-normal font-Poppins text-base line-clamp-6 leading-7">
        <span dangerouslySetInnerHTML={{ __html: cleanedHTML }} />
      </p>
      <Link
        href={`/podcasts/${props.podcastId}`}
        className=" underline font-medium text-sm md:text-base leading-5 self-start mt-1 text-primary"
      >
        Read More
      </Link>
    </div>
  );
};

export default PodcastCart;
