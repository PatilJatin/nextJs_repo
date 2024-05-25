"use client";

import React, { FC, ReactNode, useEffect, useRef } from "react";

type FiltersDivProps = {
  show: boolean;
  hide: () => void;
  children: ReactNode;
};

const FiltersDiv: FC<FiltersDivProps> = (props) => {
  const { hide, show, children } = props;

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        hide();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  if (!show) return null;

  return (
    <div
      ref={dropdownRef}
      className="min-h-24 rounded-lg font-Poppins absolute flex top-full right-0 mt-2 max-w-80 min-w-48 bg-white shadow-xl border border-gray-300"
    >
      {children}
    </div>
  );
};

export default FiltersDiv;
