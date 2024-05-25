import Link from "next/link";
import React, { useState } from "react";
import { MdMoreVert } from "react-icons/md";

const LeadCard = ({
  email,
  name,
  content,
  createdDate,
  openDetails,
  openOptions,
  phoneNumber,
}: {
  email: string;
  content: string;
  name?: string;
  phoneNumber?: string;
  createdDate: string;
  openOptions?: () => void;
  openDetails?: () => void;
}) => {
  return (
    <div className="bg-primary-400 p-3 flex flex-col gap-5 lead-card-shadow rounded h-full">
      <div className="flex justify-between items-center relative">
        <Link
          href={"mailto:" + email}
          target="_blank"
          className="text-primary text-sm leading-5"
        >
          {email}
        </Link>
        {/* <p>edit</p> */}
        <button onClick={openOptions}>
          <MdMoreVert className="text-black text-xl" />
        </button>
      </div>
      <div
        className="flex flex-col justify-center items-center w-full gap-10 cursor-pointer"
        onClick={openDetails}
      >
        <div className="text-sm leading-5 w-full  line-clamp-5">
          <p>Name: {name} </p>
          <p>Phone Number: {phoneNumber} </p>

          <p>Query: {content}</p>
        </div>
        <p className="w-full text-right text-tertiary text-sm leading-4">
          {createdDate}
        </p>
      </div>
    </div>
  );
};

export default LeadCard;
