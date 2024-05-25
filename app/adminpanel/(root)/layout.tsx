import SideBar from "@/components/shared/sidebar/SideBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.PRODUCTION_URL || "https://wip.condokharido.ca"
  ),
  title: "Condo Kharido | Admin panel",

  description:
    "Search for new condos, upcoming projects, and browse through insightful podcasts and blogs. Let Sanjay Gupta guide you to your dream home.",

  openGraph: {
    title: "Condo Kharido | Admin panel",
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

export default function PanelRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="flex ">
        <div>
          <SideBar />
        </div>
        <div className="pt-[3.25rem] pb-6 px-6 max-h-screen flex-grow overflow-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent">
          {children}
        </div>
      </div>
    </div>
  );
}
