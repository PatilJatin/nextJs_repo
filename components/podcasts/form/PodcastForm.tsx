import SectionHeading from "@/components/properties/form/SectionHeading";
import PrimaryButton from "@/components/shared/buttons/PrimaryButton";
import { PODCAST_FORM_FIELDS } from "@/types/podcast.types";
import React, { FC } from "react";
import { useFormContext } from "react-hook-form";
import OverviewSection from "./OverviewSection";
import UploadFilesSection from "./UploadFilesSection";
import { capitalizeObjValues } from "@/helpers/adminpanel/inputs/capitalizeObjValues";
import { getPodcastData } from "@/helpers/adminpanel/podcast/getPodcastData";
import { useAppDispatch, useAppSelector } from "@/redux/features/hook";
import {
  addPodcastAction,
  podcastSelector,
  updatePodcastAction,
} from "@/redux/features/adminpanel/podcasts/podcasts.slice";
import { useRouter } from "next/navigation";
import PodcastLinksSection from "./PodcastLinksSection";

type PROPS = {
  id?: string;
  variant?: "edit" | "create";
};

const PodcastForm: FC<PROPS> = (props) => {
  const { id, variant } = props;
  const isEditForm = variant === "edit" && id !== undefined;

  const {
    register,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useFormContext<PODCAST_FORM_FIELDS>();

  const dispatch = useAppDispatch();
  const { status } = useAppSelector(podcastSelector);
  const router = useRouter();

  const onSubmit = async (data: PODCAST_FORM_FIELDS) => {
    const capitalized = capitalizeObjValues(getPodcastData(data), [
      "audioUrl",
      "bannerUrl",
      "about",
      "appleMusicPodcastLink",
      "googleMusicPodcastLink",
      "spotifyPodcastLink",
      "stitcherPodcastLink",
    ]);
    if (!isEditForm) {
      console.log(capitalized);
      dispatch(addPodcastAction(capitalized));
      if (status === "succeeded") {
        router.push("/adminpanel/podcasts");
      }
    } else {
      console.log(capitalized);
      dispatch(updatePodcastAction({ id, data: capitalized }));
      if (status === "succeeded") {
        router.push("/adminpanel/podcasts");
      }
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SectionHeading sectionNo={1} title="Overview" />
          <OverviewSection />

          <div className="border-b border-tertiary my-8"></div>

          <UploadFilesSection />

          <div className="border-b border-tertiary my-8"></div>

          <PodcastLinksSection />

          <div className="flex justify-center mt-8">
            <div className="inline-block">
              <PrimaryButton type="submit">
                {isSubmitting
                  ? "Submitting..."
                  : isEditForm
                  ? "Edit Podcast"
                  : " Add Podcast"}
              </PrimaryButton>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default PodcastForm;
