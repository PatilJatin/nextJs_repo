import React, { FC } from "react";

type HeadingProps = {
  sectionNo: number;
  title: string;
};

const SectionHeading: FC<HeadingProps> = ({ sectionNo, title }) => {
  return (
    <div className="flex font-Poppins items-center gap-3 mb-6">
      <div className="rounded-full bg-primary px-3 py-1 font-normal text-white leading-[24px]">
        {sectionNo}
      </div>
      <div className="text-secondary font-medium">{title}</div>
    </div>
  );
};

export default SectionHeading;
