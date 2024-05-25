import PropertyFormProvider from "@/components/properties/form/PropertyFormProvider";
import Header from "@/components/shared/header/Header";
import { editProperty } from "@/constants/adminpanel/editProperty.data";
import React from "react";

const AddPropertyPage = () => {
  return (
    <>
      <Header
        backBtn={`/adminpanel/properties`}
        heading="New Property"
        description="Add your new property here"
      />

      <div className="border-b border-tertiary"></div>

      {/* <PropertyFormProvider variant="edit" editData={editProperty} /> */}
      <PropertyFormProvider />
    </>
  );
};

export default AddPropertyPage;
