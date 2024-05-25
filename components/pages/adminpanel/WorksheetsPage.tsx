"use client";

import OutlinedButton from "@/components/shared/buttons/OutlinedButton";
import PrimaryButton from "@/components/shared/buttons/PrimaryButton";
import FiltersDiv from "@/components/shared/filters/FiltersDiv";
import Header from "@/components/shared/header/Header";
import PrimarySpinner from "@/components/shared/loaders/PrimarySpinner";
import WorksheetsTable from "@/components/worksheets/WorksheetsTable";
import {
  filterWorksheetNewToOldAction,
  filterWorksheetOldToNewAction,
  getAllWorksheetsAction,
  worksheetsSelector,
} from "@/redux/features/adminpanel/worksheets/worksheets.slice";
import { useAppDispatch, useAppSelector } from "@/redux/features/hook";
import { exportWorksheet } from "@/services/worksheets/worksheetsService";
import { log } from "console";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

const WorksheetsPage = () => {
  const { data } = useSession();

  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState("");

  const dispatch = useAppDispatch();
  const { filteredWorksheets, status } = useAppSelector(worksheetsSelector);

  const worksheetsFilters = [
    { name: "newest to oldest", filter: filterWorksheetNewToOldAction() },
    { name: "oldest to newest", filter: filterWorksheetOldToNewAction() },
  ];

  useEffect(() => {
    dispatch(getAllWorksheetsAction());
  }, []);

  const filterWorksheets = (filter: any) => {
    dispatch(filter);
  };

  const router = useRouter();

  const handleExport = async () => {
    const res = await exportWorksheet();

    const fileUrl = res?.data?.split("?")[0];
    console.log(fileUrl);
    if (fileUrl) {
      window.open(fileUrl, "_blank");
    }
  };
  console.log(filteredWorksheets);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <Header
        description="Welcome to worksheets page"
        heading={`Hello, ${
          data?.user.isSuperAdmin ? "Super Admin!" : "Admin!"
        } `}
      >
        <div className="flex gap-3 items-center">
          <PrimaryButton onClick={handleExport}>
            <div className="flex gap-2 items-center justify-center">
              <span>Export</span>
              <Image
                src={"/assets/other/upload-logo.svg"}
                alt="logo"
                width={24}
                height={24}
                className=""
              />
            </div>
          </PrimaryButton>

          <div className="flex-shrink-0 relative">
            <OutlinedButton
              onClick={() => setShowFilters(true)}
              colorType="primary"
              type="button"
            >
              <div className="flex items-center gap-2">
                <div>Filter By</div>
                <FaChevronDown />
              </div>
            </OutlinedButton>
            <FiltersDiv show={showFilters} hide={() => setShowFilters(false)}>
              <ul className="list-none w-full">
                {worksheetsFilters.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setActiveFilter(item.name);
                      filterWorksheets(item.filter);
                    }}
                    className={`capitalize ${
                      activeFilter === item.name ? "bg-primary text-white" : ""
                    } ${
                      index === 0 ? "rounded-tl-lg" : ""
                    }  px-5 py-4 text-xs hover:bg-primary hover:text-white ${
                      index === worksheetsFilters.length - 1
                        ? ""
                        : "border-b border-tertiary"
                    } `}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </FiltersDiv>
          </div>
        </div>
      </Header>

      {status === "loading" ? (
        <PrimarySpinner />
      ) : (
        <WorksheetsTable worksheets={filteredWorksheets} />
      )}
    </div>
  );
};

export default WorksheetsPage;
