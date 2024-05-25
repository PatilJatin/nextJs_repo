import {
  PODCAST_FORM_FIELDS,
  PODCAST_MODEL,
  PODCAST_RESPONSE,
} from "@/types/podcast.types";
export const mapPodcastToModel = (data: PODCAST_RESPONSE): PODCAST_MODEL => {
  const model: PODCAST_MODEL = {
    _id: data._id,
    name: data.name,
    category: data.category,
    about: data.about,
    bannerUrl: data.bannerUrl,
    audioTitle: data.audioTitle,
    audioUrl: data.audioUrl,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    spotifyPodcastLink: data.spotifyPodcastLink,
    appleMusicPodcastLink: data.appleMusicPodcastLink,
    googleMusicPodcastLink: data.googleMusicPodcastLink,
    stitcherPodcastLink: data.stitcherPodcastLink,
  };

  return model;
};

export const mapPodcastToForm = (data: PODCAST_MODEL): PODCAST_FORM_FIELDS => {
  return {
    about: data.about,
    audioUrl: data.audioUrl,
    audioTitle: data.audioTitle,
    name: data.name,
    bannerUrl: data.bannerUrl,
    audioInput: "",
    bannerImgInput: "",
    category: {
      label: data.category,
      value: data.category,
    },
    spotifyPodcastLink: data.spotifyPodcastLink,
    appleMusicPodcastLink: data.appleMusicPodcastLink,
    googleMusicPodcastLink: data.googleMusicPodcastLink,
    stitcherPodcastLink: data.stitcherPodcastLink,
  };
};
