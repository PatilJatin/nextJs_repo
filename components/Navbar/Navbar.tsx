"use client";
import React, { useEffect, useState } from "react";
import { navRoutes } from "@/constants/AboutUs";
import Link from "next/link";
import Image from "next/image";

import { usePathname, useRouter } from "next/navigation";
const Navbar = () => {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(false);
  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);

    // console.log(openMenu);
  };
  const handleLinkClick = (route: string) => {
    setOpenMenu(false); // Close the menu
    router.push(route); // Navigate to the desired page
  };
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Function to handle scroll event
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const shouldMakeNavbarSticky = scrollPosition > 10; // Adjust the value as needed

      setIsScrolled(shouldMakeNavbarSticky);
    };

    // Add event listener for scroll
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const imageUrl = openMenu
    ? "/assets/navbar/cross.svg"
    : "/assets/navbar/menu-icon.svg";

  return (
    <nav
      className={`py-2 w-full h-auto  text-[#EFEFEF] navbar-shadow bg-white flex justify-center items-center ${
        isScrolled ? "fixed" : "static "
      } top-0 left-0 right-0 z-[100]`}
    >
      <section className=" relative w-[97%]   mx-auto my-auto flex flex-row justify-between items-center px-2  ">
        <Link href={"/home"} className="   text:lg md:text-2xl">
          <Image
            src={"/assets/navbar/nav-logo.svg"}
            alt="logo"
            width={96}
            height={36}
            className="w-24 lg:w-36"
          />
        </Link>
        <div>
          <ul className="hidden md:flex flex-row gap-8 items-center text-base  font-Montserrat  font-normal">
            {navRoutes.map(function (nav) {
              return (
                <Link
                  href={nav.route}
                  key={nav.id}
                  className={`hover:text-primary  uppercase ${
                    pathname.includes(nav.route)
                      ? "text-primary font-medium"
                      : "text-tertiary"
                  }`}
                >
                  {nav.name}
                </Link>
              );
            })}
          </ul>
          <button className="visible  md:hidden" onClick={handleOpenMenu}>
            <Image
              src={imageUrl}
              alt="Company Image"
              width={20}
              height={20}
              className="cursor-pointer"
            />
          </button>
        </div>
        {openMenu && (
          <div className="z-[10] absolute top-[100%] bottom-0  right-2 sm:right-4 ">
            <ul className=" flex flex-col gap-2 bg-primary  rounded-md px-3 py-2">
              {navRoutes.map((nav) => (
                <button
                  key={nav.id}
                  className="text-[#EFEFEF] uppercase  "
                  onClick={() => handleLinkClick(nav.route)}
                >
                  {nav.name}
                </button>
              ))}
            </ul>
          </div>
        )}
      </section>
    </nav>
  );
};

export default Navbar;
