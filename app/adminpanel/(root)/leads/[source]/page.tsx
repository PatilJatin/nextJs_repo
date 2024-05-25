import LeadsSourcePage from "@/components/pages/adminpanel/LeadsSourcePage";
import React from "react";

const page = ({ params }: { params: { source: string } }) => {
  const { source } = params;

  return <LeadsSourcePage source={decodeURIComponent(source)} />;
};

export default page;
