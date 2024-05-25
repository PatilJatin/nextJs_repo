import LeadsPage from "@/components/pages/adminpanel/LeadsPage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.PRODUCTION_URL || "https://wip.condokharido.ca"
  ),
  title: "Condo Kharido | Leads",

  description:
    "Search for new condos, upcoming projects, and browse through insightful podcasts and blogs. Let Sanjay Gupta guide you to your dream home.",

  openGraph: {
    title: "Condo Kharido | Leads",
    description:
      "Search for new condos, upcoming projects, and browse through insightful podcasts and blogs. Let Sanjay Gupta guide you to your dream home.",
    images: [
      {
        url: "/assets/opengraph.png",
        width: 800,
        height: 600,
        alt: "Condo Kharido",
      },
    ],
  },
};

interface leadHead {
  id: number;
  sourceName: string;
  leadCount: number;
}
const Leads = () => {
  const leadHead: leadHead[] = [
    { id: 1, sourceName: "Contact Us", leadCount: 500 },
    { id: 2, sourceName: "Projects", leadCount: 1000 },
  ];

  return (
    <div>
      <h4 className="font-medium text-base leading-5">Hello, Super Admin!</h4>
      <p className="pt-2 text-tertiary font-normal text-base">
        Welcome to leads page
      </p>

      <LeadsPage />
    </div>
  );
};

export default Leads;
