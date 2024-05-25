import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  blogId: string;
  blogTitle: string;
  blogPostedDate: string;
  authorName: string;
  blogImg: string;
  blogDescription: string;
};

const BlogCart = (props: Props) => {
  console.log(props.blogDescription);
  let cleanedHTML = props.blogDescription.replace(
    /<img[^>]*>|<video[^>]*>/g,
    ""
  );
  const formatDate = (inputDate: string) => {
    const date = new Date(inputDate);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  };

  const formattedDate = formatDate(props.blogPostedDate);
  console.log(formattedDate);

  return (
    <div className="flex flex-col justify-start gap-8 lg:gap-10 w-full">
      <div>
        <p className="text-primary font-medium text-2xl  lg:text-[40px] leading-8 lg:leading-[56px]">
          {props.blogTitle}
        </p>
        <p className="font-normal text-xs lg:text-base leading-4 lg:leading-6 text-tertiary">
          {formattedDate} / by {props.authorName} / blog
        </p>
      </div>
      <div className="w-full h-[326px] lg:h-[536px] object-cover">
        <Image
          src={props.blogImg || "/assets/temp/blogImg.svg"}
          alt={props.blogTitle}
          height={269}
          width={358}
          className="w-full h-full "
        />
      </div>
      <div className="flex flex-col gap-5 ">
        <p className="line-clamp-6 lg:line-clamp-3 text-lg lg:text-xl font-normal tracking-wide leading-6 text-gray-600 ">
          <span dangerouslySetInnerHTML={{ __html: cleanedHTML }} />
        </p>
        <Link
          href={`/blogs/${props.blogId}`}
          className="primary-button self-start"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCart;
