import ProjectDetailsPage from "@/components/pages/client/ProjectDetailsPage";
import {
  getPropertyByIdAction,
  propertiesSelector,
} from "@/redux/features/adminpanel/properties/properties.slice";
import { useAppDispatch, useAppSelector } from "@/redux/features/hook";
import { useEffect } from "react";
import { Project } from "@/models/project-model";
import { Metadata, ResolvingMetadata } from "next";
import { log } from "console";

function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <ProjectDetailsPage id={params.id} />
    </div>
  );
}
export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const product = await fetch(
    `https://wip.condokharido.ca/api/v1/projects/${id}`
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      return res.json();
    })
    .catch((error) => {
      console.error("Error fetching JSON:", error);
    });

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product.data?.name || "project name",
    description: product.data?.description || "project description",
    openGraph: {
      images: [product.data?.overViewImages?.[0], ...previousImages],
    },
  };
}
export default Page;
