import { STATUS } from "@/types/common.types";
import {
  CONTACT_DETAILS_FIELDS,
  CONTACT_DETAILS_MODEL,
  CONTACT_DETAILS_RESPONSE,
} from "@/types/contactDetails.types";
import { initialContactDetails } from "./contactDetails.initial";
import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";
import {
  getContactDetails,
  updateContactDetails,
} from "@/services/contactDetails/contactService";
import request from "axios";
import toast from "react-hot-toast";
import { mapContactToModel } from "./contactDetails.mapper";

type INITIAL_STATE = {
  contactDetails: CONTACT_DETAILS_MODEL;
  status: STATUS;
  error: any;
};

const initialState: INITIAL_STATE = {
  contactDetails: initialContactDetails,
  status: "idle",
  error: null,
};

export const getContactDetailsAction = createAsyncThunk(
  "contactDetails/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getContactDetails();
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

export const updateContactDetailsAction = createAsyncThunk(
  "contactDetails/update",
  //form fields type
  async (data: Partial<CONTACT_DETAILS_RESPONSE>, { rejectWithValue }) => {
    try {
      const res = await updateContactDetails(data);
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

export const contactDetailsSlice = createSlice({
  name: "contactDetails",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getContactDetailsAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.contactDetails = mapContactToModel(action.payload.data);
      })
      .addCase(updateContactDetailsAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.contactDetails = mapContactToModel(action.payload.data);
        toast.success(action.payload.message);
      });

    builder
      .addMatcher(
        isAnyOf(
          getContactDetailsAction.pending,
          updateContactDetailsAction.pending
        ),
        (state, action) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        isAnyOf(
          getContactDetailsAction.rejected,
          updateContactDetailsAction.rejected
        ),
        (state, action) => {
          state.status = "failure";
          state.error = action.payload || "Something Went Wrong";
          toast.error(state.error);
        }
      );
  },
});

export const contactDetailsSelector = (state: RootState) =>
  state.ContactDetails;

export default contactDetailsSlice.reducer;
