import Link from "next/link";
import React, { FC, ReactNode } from "react";

type SideBarLinkProps = {
  id: number;
  link: string;
  name: string;
  isActive: boolean;
};

const SideBarLink: FC<SideBarLinkProps> = (props) => {
  const { id, link, name, isActive } = props;

  return (
    <div
      className={`w-full font-Poppins rounded-[4px] py-2 px-6 ${
        isActive ? "bg-primary text-white" : "text-black"
      } `}
    >
      <Link href={link}>{name}</Link>
    </div>
  );
};

export default SideBarLink;
