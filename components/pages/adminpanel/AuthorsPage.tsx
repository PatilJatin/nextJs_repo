"use client";

import AuthorsList from "@/components/authors/AuthorsList";
import AuthorsListWithFilters from "@/components/authors/AuthorsListWithFilters";
import PrimaryButton from "@/components/shared/buttons/PrimaryButton";
import Header from "@/components/shared/header/Header";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const AuthorsPage = () => {
  const { data } = useSession();

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <Header
        description="Welcome to author's list page"
        heading={`Hello, ${
          data?.user.isSuperAdmin ? "Super Admin!" : "Admin!"
        } `}
      >
        <Link href={`/adminpanel/authors/add-author`}>
          <PrimaryButton>Add Author</PrimaryButton>
        </Link>
      </Header>

      <AuthorsListWithFilters />
    </div>
  );
};

export default AuthorsPage;
