"use client";

import LeadDetails from "@/components/leads/LeadDetails";
import LeadCard from "@/components/reusable/LeadCard";
import OutlinedButton from "@/components/shared/buttons/OutlinedButton";
import PrimaryButton from "@/components/shared/buttons/PrimaryButton";
import FiltersDiv from "@/components/shared/filters/FiltersDiv";
import SearchBar from "@/components/shared/filters/SearchBar";
import Header from "@/components/shared/header/Header";
import PrimarySpinner from "@/components/shared/loaders/PrimarySpinner";
import Modal from "@/components/shared/modal/Modal";
import {
  deleteLeadAction,
  filterAllLeadsSourceAction,
  filterBySearch,
  getAllLeadsBySourceAction,
  leadsSelector,
} from "@/redux/features/adminpanel/leads/leads.slice";
import { useAppDispatch, useAppSelector } from "@/redux/features/hook";
import { exportLeads } from "@/services/leads/leadsService";
import { LEADS_SOURCE_MODEL } from "@/types/leads.types";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { FaChevronDown, FaEye, FaRegEye, FaTrash } from "react-icons/fa6";

type ActiveFilters = "oldest to newest" | "newest to oldest" | "";

const LeadsSourcePage = ({ source }: { source: string }) => {
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] =
    useState<ActiveFilters>("newest to oldest");
  const [openOptionsIndex, setOpenOptionsIndex] = useState<number | null>(null);
  const [currentLead, setCurrentLead] = useState<
    LEADS_SOURCE_MODEL | undefined
  >(undefined);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  // MODAL DETAILS
  const [sourceDetails, setSourceDetails] = useState<LEADS_SOURCE_MODEL | null>(
    null
  );

  const dispatch = useAppDispatch();
  const { sourceLeads, filteredSourceLeads, status } =
    useAppSelector(leadsSelector);

  useEffect(() => {
    // dispatch(getAllLeadsBySourceAction(source));
    dispatch(filterAllLeadsSourceAction({ filter: activeFilter, source }));
  }, []);

  const leadsFilters: ActiveFilters[] = [
    "newest to oldest",
    "oldest to newest",
  ];

  const filterLeads = async (filter: ActiveFilters) => {
    dispatch(filterAllLeadsSourceAction({ filter, source }));
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(filterBySearch(e.target.value));
  };

  const optionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        setOpenOptionsIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [optionsRef]);
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCurrentLead(() => undefined);
  };
  const handleDeleteLead = async (id: string) => {
    await dispatch(deleteLeadAction(id));
    handleCloseDeleteModal();
  };
  const handleExport = async () => {
    const res = await exportLeads(source);

    const fileUrl = res?.data?.split("?")[0];
    console.log(fileUrl);
    if (fileUrl) {
      window.open(fileUrl, "_blank");
    }
  };
  return (
    <>
      <Header
        heading="Source Leads"
        backBtn="/adminpanel/leads"
        description="Welcome to Leads Page"
      >
        <div className="flex gap-4 items-center">
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
                {leadsFilters.map((item: ActiveFilters, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setActiveFilter(item);
                      filterLeads(item);
                    }}
                    className={`capitalize ${
                      activeFilter === item ? "bg-primary text-white" : ""
                    } ${
                      index === 0 ? "rounded-tl-lg" : ""
                    }  px-5 py-4 text-xs hover:bg-primary hover:text-white ${
                      index === leadsFilters.length - 1
                        ? ""
                        : "border-b border-tertiary"
                    } `}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </FiltersDiv>
          </div>
        </div>
      </Header>

      <div>
        <SearchBar
          onChange={handleSearch}
          placeholder="Search by project name, first name, last name, email or phone number"
        />
      </div>

      {status === "loading" ? (
        <div className="h-[50vh]">
          <PrimarySpinner />
        </div>
      ) : (
        <div className="pt-10 w-full grid grid-cols-4 gap-5 items-stretch">
          {filteredSourceLeads.map((lead, index) => (
            <div key={index} className="relative">
              <LeadCard
                openOptions={() => setOpenOptionsIndex(index)}
                content={lead.query}
                createdDate={lead.createdAt}
                email={lead.email}
                openDetails={() => {
                  setSourceDetails(lead);
                }}
                phoneNumber={lead.phoneNumber}
                name={lead.firstName + " " + lead.lastName}
              />

              {openOptionsIndex === index && (
                <div
                  ref={optionsRef}
                  className="absolute top-7 right-7 w-20 bg-white p-3 shadow-md rounded-lg"
                >
                  <ul className="flex flex-col gap-2">
                    <li
                      // onClick={() => handleDeleteLead(lead._id)}
                      onClick={() => {
                        setCurrentLead(() => lead);
                        setIsDeleteModalOpen(true);
                      }}
                      className="text-sm text-primary-red flex items-center gap-2 hover:cursor-pointer"
                    >
                      <FaTrash className="text-xs" /> Delete
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {currentLead && (
        <Modal visible={isDeleteModalOpen} closeModal={handleCloseDeleteModal}>
          <div className="flex flex-col justify-between items-center gap-5 py-10">
            <h5 className="text-3xl ">Are You Sure?</h5>
            <p>
              {"Are you sure you want to delete this lead data permanently?"}
            </p>
            <div className="flex justify-between items-center gap-3 mt-4">
              <button
                type="button"
                className="bg-tertiary text-white text-sm leading-5 md:text-base
            font-medium text-center py-2 md:py-3 px-4 md:px-5 rounded basis-1/3"
                onClick={handleCloseDeleteModal}
              >
                Cancel
              </button>

              <button
                type="button"
                className="bg-primary-red text-white text-sm leading-5 md:text-base
            font-medium text-center py-2 md:py-3 px-4 md:px-5 rounded basis-1/3"
                onClick={() => handleDeleteLead(currentLead._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}

      {sourceDetails ? (
        <Modal
          visible={sourceDetails !== null}
          closeModal={() => setSourceDetails(null)}
        >
          <LeadDetails details={sourceDetails} />
        </Modal>
      ) : null}
    </>
  );
};

export default LeadsSourcePage;
