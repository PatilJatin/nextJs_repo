"use client";

import PropertyFormProvider from "@/components/properties/form/PropertyFormProvider";
import Header from "@/components/shared/header/Header";
import PrimarySpinner from "@/components/shared/loaders/PrimarySpinner";
import { editProperty } from "@/constants/adminpanel/editProperty.data";
import { mapProjectToProjectForm } from "@/redux/features/adminpanel/properties/properties.mapper";
import {
  getPropertyByIdAction,
  propertiesSelector,
} from "@/redux/features/adminpanel/properties/properties.slice";
import { useAppDispatch, useAppSelector } from "@/redux/features/hook";
import React, { useEffect } from "react";

const EditPropertyPage = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const { project, status } = useAppSelector(propertiesSelector);

  useEffect(() => {
    dispatch(getPropertyByIdAction(id));
  }, []);

  console.log(project);

  return (
    <>
      <Header
        backBtn={`/adminpanel/properties`}
        heading="Edit Property Details"
        description="Add your new property here"
      />

      <div className="border-b border-tertiary"></div>

      {/* {status === "loading" ? (
        <div className="h-[50vh] w-full flex justify-center items-center">
          <PrimarySpinner />
        </div>
      ) : (
        <PropertyFormProvider editData={mapProjectToProjectForm(project)} />
      )} */}
      {status === "loading" && (
        <div className="h-[50vh] w-full flex justify-center items-center">
          <PrimarySpinner />
        </div>
      )}

      {status === "succeeded" && (
        <PropertyFormProvider
          variant="edit"
          id={id}
          editData={mapProjectToProjectForm(project)}
        />
      )}
    </>
  );
};

export default EditPropertyPage;
