"use client";

import PropertiesListWithFilters from "@/components/properties/PropertiesListWithFilters";
import PrimaryButton from "@/components/shared/buttons/PrimaryButton";
import Header from "@/components/shared/header/Header";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const PropertiesPage = () => {
  const { data } = useSession();

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <Header
        description="Welcome to properties list page"
        heading={`Hello, ${
          data?.user.isSuperAdmin ? "Super Admin!" : "Admin!"
        } `}
      >
        <Link href={`/adminpanel/properties/add-property`}>
          <PrimaryButton>Add Properties</PrimaryButton>
        </Link>
      </Header>

      <PropertiesListWithFilters />
    </div>
  );
};

export default PropertiesPage;
