import { Project } from "@/types/project-type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProjectCard = ({ data }: { data: Project }) => {
  return (
    <Link
      href={`/project/${data.name.replace(/\s+/g, "-")}/${data._id}`}
      target="_blank"
      className=" flex flex-col justify-start items-start sm:p-4 md:p-0 gap-4 mb-10 lg:mb-0"
    >
      <div className="w-full h-[260px] object-cover object-center overflow-hidden rounded">
        <Image
          src={data.overViewImages?.[0]}
          alt="img"
          width={299}
          height={245}
          className="w-full h-full "
        />
      </div>
      <p className="text-primary font-bold text-xl line-clamp-1  leading-8">
        {data.name}
      </p>
      <div className="flex flex-col justify-between items-start gap-1">
        <div className="flex justify-start items-center gap-1">
          <Image
            src={"/assets/home/other/location-icon.svg"}
            alt="location"
            width={18}
            height={18}
          />
          <p className="project-card-data line-clamp-1">{data.address}</p>
        </div>
        <div className="project-card-label">
          Developer:{" "}
          <span className="project-card-data">{data.developerName}</span>
        </div>
        <div className="project-card-label">
          Neighborhood:{" "}
          <span className="project-card-data">{data.neighborhood}</span>
        </div>
        <div className="project-card-label">
          Occupancy:{" "}
          <span className="project-card-data">{data.occupancyDate}</span>
        </div>
        <div className="project-card-label">
          Deposit:{" "}
          <span className="project-card-data">CAD ${data.deposit}</span>
        </div>
        <div className="project-card-label">
          Starting Prices :{" "}
          <span className="project-card-data">
            From the CAD ${data.pricedFrom}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center gap-2">
        {data.hashtags.map((hashtag) => (
          <Link
            key={hashtag}
            href={`/result-for/hashtags/${hashtag}`}
            className="text-primary text-sm leading-5 font-normal bg-primary-400 px-2 py-1 rounded-2xl "
          >
            {hashtag}
          </Link>
        ))}
      </div>
    </Link>
  );
};

export default ProjectCard;
