import { STATUS } from "@/types/common.types";
import {
  CONTACT_DETAILS_FIELDS,
  CONTACT_DETAILS_MODEL,
  CONTACT_DETAILS_RESPONSE,
} from "@/types/contactDetails.types";
import { aboutDetailsInitial } from "./aboutDetails.initial";
import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";
import {
  getContactDetails,
  updateContactDetails,
} from "@/services/contactDetails/contactService";
import request from "axios";
import toast from "react-hot-toast";
import {
  ABOUT_DETAILS_MODEL,
  ABOUT_DETAILS_RESPONSE,
} from "@/types/aboutDetails.types";
import { mapAboutDetailsResponseToModel } from "./aboutDetails.mapper";
import {
  getAboutDetails,
  updateAboutDetails,
} from "@/services/aboutDetails/aboutDetailsService";

type INITIAL_STATE = {
  aboutDetails: ABOUT_DETAILS_MODEL;
  status: STATUS;
  error: any;
};

const initialState: INITIAL_STATE = {
  aboutDetails: aboutDetailsInitial,
  status: "idle",
  error: null,
};

export const getAboutDetailsAction = createAsyncThunk(
  "aboutDetails/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAboutDetails();
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

export const updateAboutDetailsAction = createAsyncThunk(
  "aboutDetails/update",
  //form fields type
  async (data: Partial<ABOUT_DETAILS_RESPONSE>, { rejectWithValue }) => {
    try {
      const res = await updateAboutDetails(data);
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

export const aboutDetailsSlice = createSlice({
  name: "aboutDetails",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAboutDetailsAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.aboutDetails = mapAboutDetailsResponseToModel(
          action.payload.data
        );
      })
      .addCase(updateAboutDetailsAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.aboutDetails = mapAboutDetailsResponseToModel(
          action.payload.data
        );
        toast.success(action.payload.message);
      });

    builder
      .addMatcher(
        isAnyOf(
          getAboutDetailsAction.pending,
          updateAboutDetailsAction.pending
        ),
        (state, action) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        isAnyOf(
          getAboutDetailsAction.rejected,
          updateAboutDetailsAction.rejected
        ),
        (state, action) => {
          state.status = "failure";
          state.error = action.payload || "Something Went Wrong";
          toast.error(state.error);
        }
      );
  },
});

export const aboutDetailsSelector = (state: RootState) => state.AboutDetails;

export default aboutDetailsSlice.reducer;
