import Link from "next/link";
import React from "react";

const LeadSourceCard = ({
  sourceName,
  leadCount,
  goto,
}: {
  sourceName: string;
  leadCount: number;
  goto: string;
}) => {
  return (
    <div className="bg-white flex flex-col basis-[20%]   border-[1px] border-tertiary rounded-lg overflow-clip">
      <div className=" flex flex-col py-6 justify-center items-center gap-3">
        <p className="font-normal text-sm leading-6 capitalize">{sourceName}</p>
        <p className="font-normal text-[32px] leading-5">{leadCount}</p>
      </div>
      <Link
        href={`/adminpanel/leads/${goto}`}
        className="text-primary-blue w-full underline bg-primary-400  text-center py-3  font-medium text-lg leading-8"
      >
        View All
      </Link>
    </div>
  );
};

export default LeadSourceCard;
