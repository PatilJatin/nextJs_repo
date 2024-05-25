"use client";

import PodcastFormProvider from "@/components/podcasts/form/PodcastFormProvider";
import PrimarySpinner from "@/components/shared/loaders/PrimarySpinner";
import { mapPodcastToForm } from "@/redux/features/adminpanel/podcasts/podcasts.mapper";
import {
  getPodcastAction,
  podcastSelector,
} from "@/redux/features/adminpanel/podcasts/podcasts.slice";
import { useAppDispatch, useAppSelector } from "@/redux/features/hook";
import React, { useEffect } from "react";

const EditPodcastPage = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const { podcast, status } = useAppSelector(podcastSelector);

  useEffect(() => {
    dispatch(getPodcastAction(id));
  }, []);

  return (
    <>
      {status === "loading" ? (
        <div className="h-[50vh]">
          <PrimarySpinner />
        </div>
      ) : (
        <PodcastFormProvider
          id={id}
          variant="edit"
          editData={mapPodcastToForm(podcast)}
        />
      )}
    </>
  );
};

export default EditPodcastPage;
