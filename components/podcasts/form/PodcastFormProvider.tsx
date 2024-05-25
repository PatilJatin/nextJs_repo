"use client";

import { PODCAST_FORM_FIELDS } from "@/types/podcast.types";
import React, { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PodcastForm from "./PodcastForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { podcastFormValidations } from "@/formValidations/podcastForm.validations";

type PODCAST_PROPS = {
  id?: string;
  editData?: PODCAST_FORM_FIELDS;
  variant?: "edit" | "create";
};

const PodcastFormProvider: FC<PODCAST_PROPS> = (props) => {
  const { id, editData, variant = "create" } = props;

  const defaultValues: PODCAST_FORM_FIELDS = {
    audioInput: "",
    audioTitle: "",
    audioUrl: "",
    bannerImgInput: "",
    bannerUrl: "",
    category: {
      label: "",
      value: "",
    },
    about: "",
    name: "",
    appleMusicPodcastLink: "",
    googleMusicPodcastLink: "",
    spotifyPodcastLink: "",
    stitcherPodcastLink: "",
  };

  const methods = useForm({
    mode: "all",
    defaultValues: editData || defaultValues,
    resolver: zodResolver(podcastFormValidations),
  });

  return (
    <>
      <FormProvider {...methods}>
        <PodcastForm id={id} variant={variant} />
      </FormProvider>
    </>
  );
};

export default PodcastFormProvider;
