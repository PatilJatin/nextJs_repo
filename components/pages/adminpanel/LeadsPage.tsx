"use client";

import { auth } from "@/Firebase/firebaseClient";
import LeadSourceCard from "@/components/reusable/LeadSourceCard";
import PrimarySpinner from "@/components/shared/loaders/PrimarySpinner";
import {
  getAllLeadsTypesAction,
  leadsSelector,
} from "@/redux/features/adminpanel/leads/leads.slice";
import { useAppDispatch, useAppSelector } from "@/redux/features/hook";
import React, { useEffect } from "react";

const LeadsPage = () => {
  const dispatch = useAppDispatch();
  const { leadTypes, status } = useAppSelector(leadsSelector);

  useEffect(() => {
    dispatch(getAllLeadsTypesAction());
  }, []);

  return (
    <>
      {status === "loading" ? (
        <div className="h-[50vh]">
          <PrimarySpinner />
        </div>
      ) : (
        <div className="flex justify-start items-center gap-8 pt-10 ">
          {leadTypes.map((lead) => {
            return (
              <LeadSourceCard
                key={lead._id}
                goto={lead._id}
                leadCount={lead.count}
                sourceName={lead._id}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default LeadsPage;
