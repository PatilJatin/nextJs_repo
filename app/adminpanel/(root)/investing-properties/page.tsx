"use client";

import { useSession } from "next-auth/react";
import Header from "@/components/shared/header/Header";
import { Toaster } from "react-hot-toast";

import React, { useEffect } from "react";
import Link from "next/link";
import PrimaryButton from "@/components/shared/buttons/PrimaryButton";
import InvestingPropertiesTable from "@/components/investing-properties/InvestingPropertiesTable";
import { useAppDispatch, useAppSelector } from "@/redux/features/hook";
import {
  getAllInvestingInPropertiesAction,
  investingInPropertiesSelector,
} from "@/redux/features/adminpanel/InvestingInProperties/InvestingInProperties.slice";

type Props = {};

function page({}: Props) {
  const { data } = useSession();
  const dispatch = useAppDispatch();

  const { status, invProps } = useAppSelector(investingInPropertiesSelector);
  useEffect(() => {
    dispatch(getAllInvestingInPropertiesAction());
  }, []);
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <Header
        description="Welcome to Investing In Properties list page"
        heading={`Hello, ${
          data?.user.isSuperAdmin ? "Super Admin!" : "Admin!"
        } `}
      >
        <Link href={`/adminpanel/investing-properties/newInvestingProperties`}>
          <PrimaryButton>Add Investing In Properties</PrimaryButton>
        </Link>
      </Header>
      {/* todo:add search tab */}
      <InvestingPropertiesTable invProps={invProps} />
      {/* <PodcastListWithFilters /> */}

      <Toaster />
    </div>
  );
}

export default page;
