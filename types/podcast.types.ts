import { OPTION } from "./common.types";

export type PODCAST_RESPONSE = {
  _id: string;
  name: string;
  category: string;
  about: string;
  bannerUrl: string;
  audioTitle: string;
  audioUrl: string;
  createdAt: string;
  updatedAt: string;
  spotifyPodcastLink: string;
  appleMusicPodcastLink: string;
  googleMusicPodcastLink: string;
  stitcherPodcastLink: string;
  __v: number;
};

export type PODCAST_MODEL = {
  _id: string;
  name: string;
  category: string;
  about: string;
  bannerUrl: string;
  audioTitle: string;
  audioUrl: string;
  createdAt: string;
  updatedAt: string;
  spotifyPodcastLink: string;
  appleMusicPodcastLink: string;
  googleMusicPodcastLink: string;
  stitcherPodcastLink: string;
};

export type PODCAST_FORM_FIELDS = {
  name: string;
  category: OPTION;
  about: string;
  bannerUrl: string;
  bannerImgInput: string;
  audioTitle: string;
  audioUrl: string;
  audioInput: string;
  spotifyPodcastLink: string;
  appleMusicPodcastLink: string;
  googleMusicPodcastLink: string;
  stitcherPodcastLink: string;
};
