"use client";

import { icons } from "@/public/assets/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FC, ReactNode } from "react";

type HeaderProps = {
  backBtn?: string;
  heading: string;
  description?: string;
  children?: ReactNode;
};

const Header: FC<HeaderProps> = (props) => {
  const router = useRouter();

  const handleNavigateBack = () => {
    if (backBtn) router.push(backBtn);
  };

  const { children, heading, backBtn, description } = props;
  return (
    <div className="flex justify-between items-center w-full mb-9">
      {/* left Content */}
      <div className="flex gap-3">
        {backBtn ? (
          <button
            onClick={() => {
              handleNavigateBack();
            }}
            type="button"
            className="self-start"
          >
            <Image src={icons.backBtn} height={24} width={24} alt="Back" />
          </button>
        ) : null}
        <div className="font-Poppins">
          <h2 className=" font-medium text-base leading-[1.4rem] mb-2">
            {heading}
          </h2>
          <h3 className="font-normal text-tertiary">{description}</h3>
        </div>
      </div>

      {/* Right Content */}
      <div>{children}</div>
    </div>
  );
};

export default Header;
