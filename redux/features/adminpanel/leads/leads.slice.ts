import { RootState } from "@/app/store";
import {
  createLead,
  deleteLead,
  filterAllLeadsSource,
  getAllLeadsBySource,
  getAllLeadsTypes,
} from "@/services/leads/leadsService";
import { STATUS } from "@/types/common.types";
import {
  LEADS_SOURCE_MODEL,
  LEADS_SOURCE_RESPONSE,
  LEADS_TYPES_MODEL,
  LEADS_TYPES_RESPONSE,
} from "@/types/leads.types";
import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  isAnyOf,
} from "@reduxjs/toolkit";
import request from "axios";
import { mapLeadsSourceToModel, mapLeadsTypesToModel } from "./leads.mapper";
import toast from "react-hot-toast";
import { SourceTextModule } from "vm";

type INITIAL_STATE = {
  leadTypes: LEADS_TYPES_MODEL[];
  sourceLeads: LEADS_SOURCE_MODEL[];
  filteredSourceLeads: LEADS_SOURCE_MODEL[];
  status: STATUS;
  error: any;
};

const initialState: INITIAL_STATE = {
  leadTypes: [],
  sourceLeads: [],
  filteredSourceLeads: [],
  status: "idle",
  error: null,
};

export const getAllLeadsTypesAction = createAsyncThunk(
  "leads/getAllActionTypes",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllLeadsTypes();
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

export const getAllLeadsBySourceAction = createAsyncThunk(
  "leads/getLeadsBySource",
  async (source: string, { rejectWithValue }) => {
    try {
      const res = await getAllLeadsBySource(source);
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

export const filterAllLeadsSourceAction = createAsyncThunk(
  "leads/filterAllLeadsSource",
  async (filters: { filter: string; source: string }, { rejectWithValue }) => {
    try {
      const res = await filterAllLeadsSource(filters.filter, filters.source);
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

export const deleteLeadAction = createAsyncThunk(
  "leads/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await deleteLead(id);
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

export const addLeadAction = createAsyncThunk(
  "podcast/add",
  async (data: Partial<LEADS_SOURCE_RESPONSE>, { rejectWithValue }) => {
    try {
      const res = await createLead(data);
      return res;
    } catch (error) {
      console.log(error);

      if (request.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data.error || "Something went wrong"
        );
      } else return rejectWithValue(error as Error);
    }
  }
);

const leadsSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {
    filterBySearch: (state, action: PayloadAction<string>) => {
      const { payload } = action;

      if (payload === "") {
        state.filteredSourceLeads = state.sourceLeads;
      }

      state.filteredSourceLeads = state.sourceLeads.filter(
        (source) =>
          source.firstName.toLowerCase().includes(payload.toLowerCase()) ||
          source.lastName.toLowerCase().includes(payload.toLowerCase()) ||
          source.phoneNumber.toLowerCase().includes(payload.toLowerCase()) ||
          source.email.toLowerCase().includes(payload.toLowerCase())
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllLeadsTypesAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.leadTypes = action.payload.data.map(
          (item: LEADS_TYPES_RESPONSE) => mapLeadsTypesToModel(item)
        );
      })
      .addCase(getAllLeadsBySourceAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.sourceLeads = action.payload.data.leads.map(
          (item: LEADS_SOURCE_RESPONSE) => mapLeadsSourceToModel(item)
        );
        state.filteredSourceLeads = state.sourceLeads;
      })
      .addCase(filterAllLeadsSourceAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.filteredSourceLeads = action.payload.data.data.map(
          (item: LEADS_SOURCE_RESPONSE) => mapLeadsSourceToModel(item)
        );
        state.sourceLeads = state.filteredSourceLeads;
      })
      .addCase(deleteLeadAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.sourceLeads = state.sourceLeads.filter(
          (item) => item._id !== action.payload.data._id
        );
        state.filteredSourceLeads = state.sourceLeads;
      })
      .addCase(addLeadAction.fulfilled, (state, action) => {
        state.status = "succeeded";
      });

    builder
      .addMatcher(
        isAnyOf(
          getAllLeadsTypesAction.pending,
          getAllLeadsBySourceAction.pending,
          filterAllLeadsSourceAction.pending,
          addLeadAction.pending
        ),
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        isAnyOf(
          getAllLeadsTypesAction.rejected,
          getAllLeadsBySourceAction.rejected,
          filterAllLeadsSourceAction.rejected,
          addLeadAction.rejected
        ),
        (state, action) => {
          state.status = "failure";
          state.error = action.payload || "Something Went Wrong";
          toast.error(state.error);
        }
      );
  },
});

export const { filterBySearch } = leadsSlice.actions;

export const leadsSelector = (state: RootState) => state.Leads;

export default leadsSlice.reducer;
