import { RootState } from "@/app/store";
import {
  createAuthor,
  deleteAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
} from "@/services/authors/authorService";
import { AUTHORS_RESPONSE, AUTHOR_MODEL } from "@/types/authors.types";
import { STATUS } from "@/types/common.types";
import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  isAnyOf,
} from "@reduxjs/toolkit";
import request from "axios";
import toast from "react-hot-toast";
import { mapResponseToAuthorModel } from "./authors.mapper";
import { initialAuthorState } from "./authors.initial";
import { map } from "zod";
import { AUTHOR_FORM_FIELDS } from "@/components/authors/form/AuthorFormProvider";

type INITIAL_STATE = {
  author: AUTHOR_MODEL;
  authors: AUTHOR_MODEL[];
  filteredAuthors: AUTHOR_MODEL[];
  status: STATUS;
  error: any;
};

const initialState: INITIAL_STATE = {
  author: initialAuthorState,
  authors: [],
  filteredAuthors: [],
  status: "idle",
  error: null,
};

export const getAllAuthorsAction = createAsyncThunk(
  "authors/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllAuthors();
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

export const getAuthorByIdAction = createAsyncThunk(
  "authors/getById",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await getAuthorById(id);
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

export const createAuthorsAction = createAsyncThunk(
  "authors/create",
  async (data: AUTHOR_FORM_FIELDS, { rejectWithValue }) => {
    try {
      const res = await createAuthor(data);
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

export const updateAuthorsAction = createAsyncThunk(
  "authors/update",
  async (
    { id, data }: { id: string; data: AUTHOR_FORM_FIELDS },
    { rejectWithValue }
  ) => {
    try {
      const res = await updateAuthor(id, data);
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

export const deleteAuthorAction = createAsyncThunk(
  "authors/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await deleteAuthor(id);
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

const authorsSlice = createSlice({
  name: "authors",
  initialState,
  reducers: {
    filterBySearch: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      if (payload === "") {
        state.filteredAuthors = state.authors;
      }
      state.filteredAuthors = state.authors.filter((project) =>
        project.name.toLowerCase().includes(payload.toLowerCase())
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAuthorsAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.authors = action.payload.data.data.map((item: AUTHORS_RESPONSE) =>
          mapResponseToAuthorModel(item)
        );
        state.filteredAuthors = state.authors;
      })
      .addCase(getAuthorByIdAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.author = mapResponseToAuthorModel(action.payload.data);
        state.filteredAuthors = state.authors;
      })
      .addCase(createAuthorsAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success(action.payload.message);
      })
      .addCase(updateAuthorsAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success(action.payload.message);
      })
      .addCase(deleteAuthorAction.fulfilled, (state, action) => {
        toast.success(action.payload.message);
        state.authors = state.authors.filter(
          (item: AUTHOR_MODEL) => item._id !== action.payload.data._id
        );
        state.filteredAuthors = state.authors;
        state.status = "succeeded";
      });

    builder
      .addMatcher(
        isAnyOf(
          getAllAuthorsAction.pending,
          getAuthorByIdAction.pending,
          createAuthorsAction.pending,
          updateAuthorsAction.pending,
          deleteAuthorAction.pending
        ),
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        isAnyOf(
          getAllAuthorsAction.rejected,
          getAuthorByIdAction.rejected,
          createAuthorsAction.rejected,
          updateAuthorsAction.rejected,
          deleteAuthorAction.rejected
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

export const { filterBySearch } = authorsSlice.actions;

export const authorsSelector = (state: RootState) => state.Authors;

export default authorsSlice.reducer;
