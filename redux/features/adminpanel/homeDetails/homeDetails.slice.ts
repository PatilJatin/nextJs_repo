import { STATUS } from "@/types/common.types";
import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";
import request from "axios";
import toast from "react-hot-toast";
import {
  HOME_DETAILS_MODEL,
  HOME_DETAILS_RESPONSE,
} from "@/types/homeDetails.types";
import {
  getHomeDetails,
  updateHomeDetails,
} from "@/services/homeDetails/homeDetailsService";
import { initalHomeDetails } from "./homeDetails.initial";
import { mapHomeDetailsResponseToModel } from "./homeDetails.mapper";

type INITIAL_STATE = {
  homeDetails: HOME_DETAILS_MODEL;
  status: STATUS;
  error: any;
};

const initialState: INITIAL_STATE = {
  homeDetails: initalHomeDetails,
  status: "idle",
  error: null,
};

export const getHomeDetailsAction = createAsyncThunk(
  "homeDetails/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getHomeDetails();
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

export const updateHomeDetailsAction = createAsyncThunk(
  "homeDetails/update",
  //form fields type
  async (data: Partial<HOME_DETAILS_RESPONSE>, { rejectWithValue }) => {
    try {
      const res = await updateHomeDetails(data);
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

export const homeDetailsSlice = createSlice({
  name: "homeDetailsSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getHomeDetailsAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.homeDetails = mapHomeDetailsResponseToModel(action.payload.data);
      })
      .addCase(updateHomeDetailsAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.homeDetails = mapHomeDetailsResponseToModel(action.payload.data);
        toast.success(action.payload.message);
      });

    builder
      .addMatcher(
        isAnyOf(getHomeDetailsAction.pending, updateHomeDetailsAction.pending),
        (state, action) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        isAnyOf(
          getHomeDetailsAction.rejected,
          updateHomeDetailsAction.rejected
        ),
        (state, action) => {
          state.status = "failure";
          state.error = action.payload || "Something Went Wrong";
          toast.error(state.error);
        }
      );
  },
});

export const homeDetailsSelector = (state: RootState) => state.HomeDetails;

export default homeDetailsSlice.reducer;
