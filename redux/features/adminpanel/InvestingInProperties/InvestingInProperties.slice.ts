import { RootState } from "@/app/store";
import {
  createInvestingInProperties,
  deleteInvestingInProperties,
  getAllInvestingInProperties,
  getInvestingInProperties,
  updateInvestingInProperties,
} from "@/services/InvestingInProperties/InvestingInPropertiesService";

import { STATUS } from "@/types/common.types";
import {
  INVESTINGINPROPERTY_FORM_FIELDS,
  INVESTINGINPROPERTY_MODEL,
  INVESTINGINPROPERTY_RESPONSE,
} from "@/types/investingInPropeties.types";
import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  isAnyOf,
} from "@reduxjs/toolkit";
import request from "axios";
import toast from "react-hot-toast";
import { mapInvestingInPropertiesToModel } from "./InvestingInProperties.mapper";

type INITIAL_STATE = {
  invProps: INVESTINGINPROPERTY_MODEL[];
  status: STATUS;
  error: any;
};

const initialState: INITIAL_STATE = {
  invProps: [],
  status: "idle",
  error: null,
};

export const getAllInvestingInPropertiesAction = createAsyncThunk(
  "investingInProperties/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllInvestingInProperties();
      console.log(res);

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

export const deleteInvestingInPropertiesAction = createAsyncThunk(
  "investingInProperties/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteInvestingInProperties(id);
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

export const getInvestingInPropertiesAction = createAsyncThunk(
  "blog/getById",
  async (id: string, { rejectWithValue }) => {
    try {
      const podcast = await getInvestingInProperties(id);
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

export const addInvestingInPropertiesAction = createAsyncThunk(
  "investingInProperties/add",
  async (
    data: Partial<INVESTINGINPROPERTY_FORM_FIELDS>,
    { rejectWithValue }
  ) => {
    try {
      console.log(data);

      const res = await createInvestingInProperties(data);
      console.log(res);

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

export const updateInvestingInPropertiesAction = createAsyncThunk(
  "investingInProperties/update",
  async (
    {
      id,
      data,
    }: { id: string; data: Partial<INVESTINGINPROPERTY_FORM_FIELDS> },
    { rejectWithValue }
  ) => {
    try {
      const res = await updateInvestingInProperties(id, data);
      console.log(res);

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

const InvestingInPropertiesSlice = createSlice({
  name: "investingInProperties",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllInvestingInPropertiesAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload.data);

        state.invProps = action.payload.data.map(
          (item: INVESTINGINPROPERTY_RESPONSE) =>
            mapInvestingInPropertiesToModel(item)
        );
      })
      .addCase(updateInvestingInPropertiesAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("Update Investing Property Successful.");
      })
      .addCase(addInvestingInPropertiesAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("Investing Property Created Successfully.");
      })
      .addCase(deleteInvestingInPropertiesAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.invProps = state.invProps.filter(
          (podcast) => podcast._id !== action.payload
        );
        // state.filteredPodcasts = state.podcasts;
        toast.success("Investing Property Deleted!");
      });
    builder
      .addMatcher(
        isAnyOf(
          getAllInvestingInPropertiesAction.pending,
          updateInvestingInPropertiesAction.pending,
          addInvestingInPropertiesAction.pending,
          deleteInvestingInPropertiesAction.pending
          // updateBlogAction.pending
        ),
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        isAnyOf(
          getAllInvestingInPropertiesAction.rejected,
          updateInvestingInPropertiesAction.rejected,
          addInvestingInPropertiesAction.rejected,
          deleteInvestingInPropertiesAction.rejected
        ),
        (state, action) => {
          state.status = "failure";
          state.error = action.payload || "Something Went Wrong";
          toast.error(state.error);
        }
      );
  },
});

export const investingInPropertiesSelector = (state: RootState) =>
  state.InvestingInProperties;
export default InvestingInPropertiesSlice.reducer;
