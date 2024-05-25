"use client";

import AboutDetailsForm from "@/components/aboutDetails/AboutDetailsForm";
import Header from "@/components/shared/header/Header";
import PrimarySpinner from "@/components/shared/loaders/PrimarySpinner";
import { mapAboutDetailsModelToForm } from "@/redux/features/adminpanel/aboutDetails/aboutDetails.mapper";
import {
  aboutDetailsSelector,
  getAboutDetailsAction,
} from "@/redux/features/adminpanel/aboutDetails/aboutDetails.slice";
import { useAppDispatch, useAppSelector } from "@/redux/features/hook";
import React, { useEffect } from "react";

const AboutDetailsPage = () => {
  const dispatch = useAppDispatch();
  const { status, aboutDetails } = useAppSelector(aboutDetailsSelector);

  useEffect(() => {
    dispatch(getAboutDetailsAction());
  }, []);

  return (
    <>
      <Header
        heading="About Us Details"
        description="Update About Us details"
      ></Header>

      {status === "loading" ? (
        <div className="h-[60vh]">
          <PrimarySpinner />
        </div>
      ) : (
        <AboutDetailsForm editData={mapAboutDetailsModelToForm(aboutDetails)} />
      )}
    </>
  );
};

export default AboutDetailsPage;
