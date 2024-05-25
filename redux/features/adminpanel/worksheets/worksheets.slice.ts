import { RootState } from "@/app/store";
import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  isAnyOf,
} from "@reduxjs/toolkit";
import request from "axios";
import toast from "react-hot-toast";
import { STATUS } from "@/types/common.types";
import { WORKSHEET_MODEL, WORKSHEET_RESPONSE } from "@/types/worksheets.types";
import {
  deleteWorksheet,
  filterWorksheetsNewToOld,
  filterWorksheetsOldToNew,
  getAllWorksheets,
  getWorksheetById,
} from "@/services/worksheets/worksheetsService";
import { mapWorksheetToModel } from "./worksheets.mapper";
import { initialWorksheet } from "./worksheet.initial";

type INITIAL_STATE = {
  worksheet: WORKSHEET_MODEL;
  worksheets: WORKSHEET_MODEL[];
  filteredWorksheets: WORKSHEET_MODEL[];
  status: STATUS;
  error: any;
};

const initialState: INITIAL_STATE = {
  worksheet: initialWorksheet,
  worksheets: [],
  filteredWorksheets: [],
  status: "idle",
  error: null,
};

export const getAllWorksheetsAction = createAsyncThunk(
  "worksheets/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllWorksheets();
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

export const getWorksheetByIdAction = createAsyncThunk(
  "worksheet/getById",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await getWorksheetById(id);
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

export const filterWorksheetNewToOldAction = createAsyncThunk(
  "worksheet/filterNewToOld",
  async (_, { rejectWithValue }) => {
    try {
      const res = await filterWorksheetsNewToOld();
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

export const filterWorksheetOldToNewAction = createAsyncThunk(
  "worksheet/filterOldToNew",
  async (_, { rejectWithValue }) => {
    try {
      const res = await filterWorksheetsOldToNew();
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

export const deleteWorksheetAction = createAsyncThunk(
  "authors/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await deleteWorksheet(id);
      return res;
    } catch (error) {
      if (request.isAxiosError(error)) {
        console.log(error.response?.data.message);
        return rejectWithValue(
          error.response?.data.message || "Something went wrong"
        );
      } else return rejectWithValue(error as Error);
    }
  }
);

const worksheetsSlice = createSlice({
  name: "worksheets",
  initialState,
  reducers: {
    // filterBySearch: (state, action: PayloadAction<string>) => {
    //   const { payload } = action;
    //   if (payload === "") {
    //     state.filteredAuthors = state.authors;
    //   }
    //   state.filteredAuthors = state.authors.filter((project) =>
    //     project.name.toLowerCase().includes(payload.toLowerCase())
    //   );
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllWorksheetsAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.worksheets = action.payload.data.map((item: WORKSHEET_RESPONSE) =>
          mapWorksheetToModel(item)
        );
        state.filteredWorksheets = state.worksheets;
      })
      .addCase(getWorksheetByIdAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.worksheet = mapWorksheetToModel(action.payload.data);
      })
      .addCase(deleteWorksheetAction.fulfilled, (state, action) => {
        toast.success("Worksheet Deleted!");
        state.worksheets = state.worksheets.filter(
          (item: WORKSHEET_MODEL) => item._id !== action.payload.data._id
        );
        state.filteredWorksheets = state.worksheets;
        state.status = "succeeded";
      })
      .addCase(filterWorksheetOldToNewAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.filteredWorksheets = action.payload.data.map(
          (item: WORKSHEET_RESPONSE) => mapWorksheetToModel(item)
        );
      })
      .addCase(filterWorksheetNewToOldAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.filteredWorksheets = action.payload.data.map(
          (item: WORKSHEET_RESPONSE) => mapWorksheetToModel(item)
        );
      });

    builder
      .addMatcher(
        isAnyOf(
          getAllWorksheetsAction.pending,
          getWorksheetByIdAction.pending,
          deleteWorksheetAction.pending,
          filterWorksheetNewToOldAction.pending,
          filterWorksheetOldToNewAction.pending
        ),
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        isAnyOf(
          getAllWorksheetsAction.rejected,
          getWorksheetByIdAction.rejected,
          deleteWorksheetAction.rejected,
          filterWorksheetNewToOldAction.rejected,
          filterWorksheetOldToNewAction.rejected
        ),
        (state, action) => {
          state.status = "failure";
          state.error = action.payload || "Something Went Wrong";
          toast.error(state.error);
          console.log(action.payload);
        }
      );
  },
});

export const worksheetsSelector = (state: RootState) => state.Worksheets;

export default worksheetsSlice.reducer;
