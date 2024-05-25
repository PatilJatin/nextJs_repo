const podcastEndpoints = {
  createPodcast: `/podcasts`,
  getAllPodcasts: "/podcasts",
  getAllPodcastsByCategory: "/podcasts/bycategory",
  getPodcastListByCategory:"/podcasts/filter",
  deletePodcast: (id: string) => `/podcasts/${id}`,
  updatePodcast: (id: string) => `/podcasts/${id}`,
  getPodcast: (id: string) => `/podcasts/${id}`,
};

export { podcastEndpoints };
