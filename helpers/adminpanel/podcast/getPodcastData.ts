import { PODCAST_FORM_FIELDS, PODCAST_RESPONSE } from "@/types/podcast.types";

export const getPodcastData = (
  data: PODCAST_FORM_FIELDS
): Partial<PODCAST_RESPONSE> => {
  return {
    about: data.about,
    audioTitle: data.audioTitle,
    category: data.category.value,
    name: data.name,
    audioUrl: data.audioUrl,
    bannerUrl: data.bannerUrl,
    appleMusicPodcastLink: data.appleMusicPodcastLink,
    googleMusicPodcastLink: data.googleMusicPodcastLink,
    spotifyPodcastLink: data.spotifyPodcastLink,
    stitcherPodcastLink: data.stitcherPodcastLink,
  };
};
