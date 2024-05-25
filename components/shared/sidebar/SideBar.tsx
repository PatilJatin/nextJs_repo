"use client";

import { navAssets } from "@/public/assets/navbar";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SideBarLink from "./SideBarLink";
import { usePathname } from "next/navigation";
import OutlinedButton from "../buttons/OutlinedButton";
import LogoutButton from "../buttons/LogoutButton";

const SideBar = () => {
  const path = usePathname();

  const links = [
    { id: 1, link: "/adminpanel/admins", name: "Admins" },
    { id: 2, link: "/adminpanel/properties", name: "Properties" },
    { id: 3, link: "/adminpanel/leads", name: "Leads" },
    { id: 4, link: "/adminpanel/worksheets", name: "Worksheets" },
    { id: 5, link: "/adminpanel/podcasts", name: "Podcasts" },
    { id: 6, link: "/adminpanel/blogs", name: "Blogs" },
    { id: 7, link: "/adminpanel/authors", name: "Authors" },
    { id: 10, link: "/adminpanel/home-details", name: "Home " },
    { id: 8, link: "/adminpanel/about-us-details", name: "About Us" },
    { id: 9, link: "/adminpanel/contact-details", name: "Contact Us" },
    { id: 11, link: "/adminpanel/privacy-policy", name: "Privacy  Policy" },
    {
      id: 11,
      link: "/adminpanel/categoryAndHashtags",
      name: "Categories & hashtags",
    },
    {
      id: 12,
      link: "/adminpanel/investing-properties",
      name: "Investing In Properties",
    },
  ];

  return (
    <div className=" w-60 border-r border-[#BBBBBB] h-screen py-10 px-8">
      <div className="flex flex-col items-center h-full gap-12 ">
        <div className="">
          <Image src={navAssets.logo} height={58} width={151} alt="Logo" />
        </div>

        <div className="h-full w-full flex-grow flex flex-col items-center gap-3 overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent scrollbar-none">
          {links.map((link) => {
            return (
              <SideBarLink
                key={link.id}
                isActive={path.includes(link.link)}
                {...link}
              />
            );
          })}
        </div>

        <div className="justify-end w-full">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
