import { RootState } from "@/app/store";
import {
  getAllPodcasts,
  deletePodcast,
  createPodcast,
  updatePodcast,
  getPodcast,
  getAllPodcastsWithCategory,
  getAllPodcastListByCategory,
} from "@/services/podcasts/podcastService";
import { STATUS } from "@/types/common.types";
import { USER } from "@/types/user.types";
import { PODCAST_MODEL, PODCAST_RESPONSE } from "@/types/podcast.types";
import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  isAnyOf,
} from "@reduxjs/toolkit";
import request from "axios";
import toast from "react-hot-toast";
import { mapPodcastToModel } from "./podcasts.mapper";
import { stat } from "fs";
import { initialPodcastData } from "./podcast.initial";

type INITIAL_STATE = {
  podcast: PODCAST_MODEL;
  podcasts: PODCAST_MODEL[];
  filteredPodcasts: PODCAST_MODEL[];
  status: STATUS;
  error: any;
};

const initialState: INITIAL_STATE = {
  podcast: initialPodcastData,
  podcasts: [],
  filteredPodcasts: [],
  status: "idle",
  error: null,
};

export const getAllPodcastsAction = createAsyncThunk(
  "podcast/getAllPodcasts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllPodcasts();
      return res;
    } catch (error) {
      if (request.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data.error || "Something went wrong"
        );
      } else return rejectWithValue(error as Error);
    }
  }
);

export const getAllPodcastsWithCategoryAction = createAsyncThunk(
  "podcast/getAllPodcastsWithCategory",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllPodcastsWithCategory();
      return res;
    } catch (error) {
      if (request.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data.error || "Something went wrong"
        );
      } else return rejectWithValue(error as Error);
    }
  }
);

export const getAllPodcastListByCategoryAction = createAsyncThunk(
  "podcast/getAllPodcastsListByCategory",
  async (category: string, { rejectWithValue }) => {
    try {
      const res = await getAllPodcastListByCategory(category);
      return res;
    } catch (error) {
      if (request.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data.error || "Something went wrong"
        );
      } else return rejectWithValue(error as Error);
    }
  }
);

export const deletePodcastAction = createAsyncThunk(
  "podcast/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await deletePodcast(id);
      return id;
    } catch (error) {
      if (request.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data.error || "Something went wrong"
        );
      } else return rejectWithValue(error as Error);
    }
  }
);

export const getPodcastAction = createAsyncThunk(
  "podcast/getById",
  async (id: string, { rejectWithValue }) => {
    try {
      const podcast = await getPodcast(id);
      return podcast;
    } catch (error) {
      if (request.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data.error || "Something went wrong"
        );
      } else return rejectWithValue(error as Error);
    }
  }
);

export const addPodcastAction = createAsyncThunk(
  "podcast/add",
  async (data: Partial<PODCAST_RESPONSE>, { rejectWithValue }) => {
    try {
      const res = await createPodcast(data);
      return res;
    } catch (error) {
      if (request.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data.error || "Something went wrong"
        );
      } else return rejectWithValue(error as Error);
    }
  }
);

export const updatePodcastAction = createAsyncThunk(
  "podcast/update",
  async (
    { id, data }: { id: string; data: Partial<PODCAST_RESPONSE> },
    { rejectWithValue }
  ) => {
    try {
      const res = await updatePodcast(id, data);
      return res;
    } catch (error) {
      if (request.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data.error || "Something went wrong"
        );
      } else return rejectWithValue(error as Error);
    }
  }
);

const podcastSlice = createSlice({
  name: "podcast",
  initialState,
  reducers: {
    filterBySearch: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      if (payload === "") {
        state.filteredPodcasts = state.podcasts;
      }
      state.filteredPodcasts = state.filteredPodcasts.filter((podcast) =>
        podcast.name.toLowerCase().includes(payload.toLowerCase())
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllPodcastsAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.podcasts = action.payload.data.map((item: PODCAST_RESPONSE) =>
          mapPodcastToModel(item)
        );
        state.filteredPodcasts = state.podcasts;
        // toast.success(action.payload.message);
      })
      .addCase(getAllPodcastsWithCategoryAction.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(getAllPodcastListByCategoryAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.filteredPodcasts = action.payload.data.podcasts.map(
          (item: PODCAST_RESPONSE) => mapPodcastToModel(item)
        );
      })
      .addCase(deletePodcastAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.podcasts = state.podcasts.filter(
          (podcast) => podcast._id !== action.payload
        );
        state.filteredPodcasts = state.podcasts;
        toast.success("Podcast Deleted!");
      })
      .addCase(getPodcastAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.podcast = mapPodcastToModel(action.payload.data);
      })
      .addCase(addPodcastAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success(action.payload.message);
      })
      .addCase(updatePodcastAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success(action.payload.message);
      });

    builder
      .addMatcher(
        isAnyOf(
          getAllPodcastListByCategoryAction.pending,
          getAllPodcastsAction.pending,
          getAllPodcastListByCategoryAction.pending,
          deletePodcastAction.pending,
          getPodcastAction.pending,
          addPodcastAction.pending,
          updatePodcastAction.pending
        ),
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        isAnyOf(
          getAllPodcastListByCategoryAction.rejected,
          getAllPodcastsAction.rejected,
          getAllPodcastListByCategoryAction.rejected,
          deletePodcastAction.rejected,
          getPodcastAction.rejected,
          addPodcastAction.rejected,
          updatePodcastAction.rejected
        ),
        (state, action) => {
          state.status = "failure";
          state.error = action.payload || "Something Went Wrong";
          toast.error(state.error);
        }
      );
  },
});

export const { filterBySearch } = podcastSlice.actions;

export const podcastSelector = (state: RootState) => state.Podcast;

export default podcastSlice.reducer;
