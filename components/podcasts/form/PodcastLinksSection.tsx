import { Input } from "@/components/formComponents/Input";
import SectionHeading from "@/components/properties/form/SectionHeading";
import { PODCAST_FORM_FIELDS } from "@/types/podcast.types";
import React from "react";
import { useFormContext } from "react-hook-form";

const PodcastLinksSection = () => {
  const {
    register,
    control,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    setError,
    trigger,
  } = useFormContext<PODCAST_FORM_FIELDS>();

  return (
    <>
      <SectionHeading sectionNo={3} title="Podcast Links" />

      <div className="grid grid-cols-2 gap-x-8 gap-y-7">
        <Input
          id="spotifyPodcastLink"
          {...register("spotifyPodcastLink")}
          label="Spotify Link"
          placeholder="Enter spotify link"
          error={errors.spotifyPodcastLink?.message}
        />

        <Input
          id="appleMusicPodcastLink"
          {...register("appleMusicPodcastLink")}
          label="Apple Music Link"
          placeholder="Enter apple music link"
          error={errors.appleMusicPodcastLink?.message}
        />

        <Input
          id="googleMusicPodcastLink"
          {...register("googleMusicPodcastLink")}
          label="Google Music Link"
          placeholder="Enter google music link"
          error={errors.googleMusicPodcastLink?.message}
        />

        <Input
          id="stitcherPodcastLink"
          {...register("stitcherPodcastLink")}
          label="Stitcher Link"
          placeholder="Enter stitcher link"
          error={errors.stitcherPodcastLink?.message}
        />
      </div>
    </>
  );
};

export default PodcastLinksSection;
