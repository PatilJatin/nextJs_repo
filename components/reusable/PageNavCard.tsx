import Image from "next/image";
import Link from "next/link";
import React from "react";

const PageNavCard = ({
  imgSrc,
  head,
  goto,
}: {
  imgSrc: string;
  head: string;
  goto: string;
}) => {
  return (
    <Link
      href={goto}
      className="flex flex-col gap-2 md:gap-2 lg:gap-3 lg:py-4 group"
    >
      <div className="object-cover w-[90%] h-[6.625rem] lg:w-full lg:h-[15.313rem] mx-auto rounded lg:py-4  ">
        <Image
          src={imgSrc}
          alt="img"
          width={299}
          height={245}
          className=" w-full md:w-[95%] mx-auto h-full rounded"
        />
      </div>
      <p className="text-tertiary text-opacity-65 text-base text-center font-normal leading-6 group-hover:text-primary">
        {head}
      </p>
    </Link>
  );
};

export default PageNavCard;
