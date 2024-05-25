import InvPropFormProvider from "@/components/investing-properties/form/InvPropFormProvider";
import Header from "@/components/shared/header/Header";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <>
      <Header
        description="Add your new investing-properties here"
        heading={`New investing-properties`}
        backBtn="/adminpanel/investing-properties"
      ></Header>

      <div className="border-b border-tertiary mb-8"></div>

      {/* <PodcastFormProvider /> */}
      <InvPropFormProvider />
    </>
  );
};

export default page;
