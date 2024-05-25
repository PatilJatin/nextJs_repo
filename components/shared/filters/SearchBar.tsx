import { icons } from "@/public/assets/icons";
import Image from "next/image";
import React, { ComponentProps, FC } from "react";

interface SearchBarProps extends ComponentProps<"input"> {}

const SearchBar: FC<SearchBarProps> = (props) => {
  return (
    <div className="flex w-full p-3 gap-3 border border-tertiary font-Poppins rounded-xl focus-within:border-black">
      <div>
        <Image src={icons.search} height={24} width={24} alt="Search" />
      </div>
      <input
        {...props}
        className="w-full text-sm placeholder:text-tertiary outline-none focus:outline-none peer"
        type="text"
      />
    </div>
  );
};

export default SearchBar;
