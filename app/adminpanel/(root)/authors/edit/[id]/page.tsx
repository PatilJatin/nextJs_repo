import EditAuthor from "@/components/pages/adminpanel/EditAuthor";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <>
      <EditAuthor id={id} />
    </>
  );
};

export default page;
