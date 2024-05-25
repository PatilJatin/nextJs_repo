"use client";

import HomeDetailsForm from "@/components/homeDetails/HomeDetailsForm";
import Header from "@/components/shared/header/Header";
import PrimarySpinner from "@/components/shared/loaders/PrimarySpinner";
import { mapHomeDetailsModelToForm } from "@/redux/features/adminpanel/homeDetails/homeDetails.mapper";
import {
  getHomeDetailsAction,
  homeDetailsSelector,
} from "@/redux/features/adminpanel/homeDetails/homeDetails.slice";
import { useAppDispatch, useAppSelector } from "@/redux/features/hook";
import React, { useEffect } from "react";

const HomeDetailsPage = () => {
  const dispatch = useAppDispatch();
  const { homeDetails, status } = useAppSelector(homeDetailsSelector);

  useEffect(() => {
    dispatch(getHomeDetailsAction());
  }, []);

  return (
    <>
      <Header
        heading="Home Page Details"
        description="Update Home Page"
      ></Header>

      {status === "loading" ? (
        <div className="h-[50vh]">
          <PrimarySpinner />
        </div>
      ) : (
        <HomeDetailsForm editData={mapHomeDetailsModelToForm(homeDetails)} />
      )}
    </>
  );
};

export default HomeDetailsPage;
