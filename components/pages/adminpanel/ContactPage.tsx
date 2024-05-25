"use client";

import ContactForm from "@/components/contactDetails/ContactForm";
import SectionHeading from "@/components/properties/form/SectionHeading";
import Header from "@/components/shared/header/Header";
import PrimarySpinner from "@/components/shared/loaders/PrimarySpinner";
import {
  contactDetailsSelector,
  getContactDetailsAction,
} from "@/redux/features/adminpanel/contactDetails/contact.slice";
import { mapContactModelToForm } from "@/redux/features/adminpanel/contactDetails/contactDetails.mapper";
import { useAppDispatch, useAppSelector } from "@/redux/features/hook";
import React, { useEffect } from "react";

const ContactPage = () => {
  const dispatch = useAppDispatch();
  const { contactDetails, status } = useAppSelector(contactDetailsSelector);

  useEffect(() => {
    dispatch(getContactDetailsAction());
  }, []);

  return (
    <>
      <Header
        heading="Contact Details"
        description="Update contact details"
      ></Header>

      <div className="border-b border-tertiary"></div>

      <div className="mt-9">
        <SectionHeading sectionNo={1} title="Overview" />

        {status === "loading" ? (
          <div className="h-[50vh]">
            <PrimarySpinner />
          </div>
        ) : (
          <ContactForm editData={mapContactModelToForm(contactDetails)} />
        )}
      </div>
    </>
  );
};

export default ContactPage;
