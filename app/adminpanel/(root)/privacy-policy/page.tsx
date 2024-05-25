"use client";

import PrivacyPolicyPage from "@/components/pages/adminpanel/PrivacyPolicyPage";
import Header from "@/components/shared/header/Header";
import PrimarySpinner from "@/components/shared/loaders/PrimarySpinner";
import {
  getPrivacyPolicyAction,
  privacyPolicySelector,
} from "@/redux/features/adminpanel/privacyPolicy/privacy.slice";
import { useAppDispatch, useAppSelector } from "@/redux/features/hook";
import React, { useEffect } from "react";
import { Metadata } from "next";

const page = () => {
  const dispatch = useAppDispatch();
  const { status, policy } = useAppSelector(privacyPolicySelector);

  useEffect(() => {
    dispatch(getPrivacyPolicyAction());
  }, []);
  return (
    <>
      <Header
        heading="Privacy Policy"
        description="Update Privacy Policy"
      ></Header>
      {status === "loading" ? (
        <div className="h-[50vh]">
          <PrimarySpinner />
        </div>
      ) : (
        <PrivacyPolicyPage policy={policy} />
      )}
    </>
  );
};

export default page;
