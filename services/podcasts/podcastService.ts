import { getSession } from "next-auth/react";
import { api } from "../apiService";
import { podcastEndpoints } from "./podcast.endpoints";
import { PODCAST_RESPONSE } from "@/types/podcast.types";

const getAllPodcasts = async () => {
  const session = await getSession();
  const res = await api.get(podcastEndpoints.getAllPodcasts, {
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
    },
  });
  return res.data;
};
const getAllPodcastsWithCategory = async () => {
  const session = await getSession();
  const res = await api.get(podcastEndpoints.getAllPodcastsByCategory, {
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
    },
  });
  return res.data;
};

const getAllPodcastListByCategory = async (category: string) => {
  const session = await getSession();

  const res = await api.post(
    podcastEndpoints.getPodcastListByCategory,
    {
      category: category,
    },
    {
      headers: {
        Authorization: `Bearer ${session?.user.access_token}`,
      },
    }
  );
  return res.data;
};

const getPodcast = async (id: string) => {
  const session = await getSession();
  const res = await api.get(podcastEndpoints.getPodcast(id), {
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
    },
  });
  return res.data;
};

const deletePodcast = async (id: string) => {
  const session = await getSession();
  const res = await api.delete(podcastEndpoints.deletePodcast(id), {
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
    },
  });
  return res.data;
};

const createPodcast = async (data: Partial<PODCAST_RESPONSE>) => {
  const session = await getSession();
  const res = await api.post(podcastEndpoints.createPodcast, data, {
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
    },
  });
  return res.data;
};

const updatePodcast = async (id: string, data: Partial<PODCAST_RESPONSE>) => {
  const session = await getSession();
  const res = await api.patch(podcastEndpoints.updatePodcast(id), data, {
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
    },
  });
  return res.data;
};

export {
  getAllPodcasts,
  deletePodcast,
  createPodcast,
  updatePodcast,
  getPodcast,
  getAllPodcastsWithCategory,
  getAllPodcastListByCategory,
};
