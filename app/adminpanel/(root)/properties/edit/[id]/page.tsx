import EditPropertyPage from "@/components/pages/adminpanel/EditPropertyPage";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return <EditPropertyPage id={id} />;
};

export default page;
