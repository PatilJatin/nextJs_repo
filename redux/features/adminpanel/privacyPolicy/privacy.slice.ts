import { RootState } from "@/app/store";
import {
  getPrivacyPolicy,
  updatePrivacyPolicy,
} from "@/services/privacyPolicy/privacyService";
import { STATUS } from "@/types/common.types";
import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import request from "axios";
import toast from "react-hot-toast";

export type POLICY = {
  _id: string;
  content: string;
};

type INITIAL_STATE = {
  policy: POLICY;
  status: STATUS;
  error: any;
};

const initialState: INITIAL_STATE = {
  policy: {
    _id: "",
    content: "",
  },
  status: "idle",
  error: null,
};

export const getPrivacyPolicyAction = createAsyncThunk(
  "policy/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getPrivacyPolicy();
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

export const updatePrivacyPolicyAction = createAsyncThunk(
  "policy/update",
  async (data: string, { rejectWithValue }) => {
    try {
      const res = await updatePrivacyPolicy(data);
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

const privacyPolicySlice = createSlice({
  name: "property",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getPrivacyPolicyAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.policy = action.payload.data;
      })
      .addCase(updatePrivacyPolicyAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success(action.payload.message);
      });

    builder
      .addMatcher(
        isAnyOf(
          getPrivacyPolicyAction.pending,
          updatePrivacyPolicyAction.pending
        ),
        (state, action) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        isAnyOf(
          getPrivacyPolicyAction.rejected,
          updatePrivacyPolicyAction.rejected
        ),
        (state, action) => {
          state.status = "failure";
          state.error = action.payload || "Something Went Wrong";
          toast.error(state.error);
        }
      );
  },
});

export const privacyPolicySelector = (state: RootState) => state.PrivacyPolicy;

export default privacyPolicySlice.reducer;
