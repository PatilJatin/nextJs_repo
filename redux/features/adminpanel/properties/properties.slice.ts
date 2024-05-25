import {
  addProperty,
  deleteProperty,
  filterPropertyByCategory,
  filterPropertyByClosingIn,
  getAllProperties,
  getPropertyById,
  updateProperty,
} from "@/services/properties/propertyService";
import { STATUS } from "@/types/common.types";
import { PROJECT_MODEL, PROJECT_RESPONSE } from "@/types/properties.types";
import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  isAnyOf,
} from "@reduxjs/toolkit";
import request from "axios";
import toast from "react-hot-toast";
import { mapProjectToModel } from "./properties.mapper";
import { RootState } from "@/app/store";
import { initialProperty } from "./properties.initialData";

type INITIAL_STATE = {
  project: PROJECT_MODEL;
  projects: PROJECT_MODEL[];
  filteredProjects: PROJECT_MODEL[];
  status: STATUS;
  error: any;
};

const initialState: INITIAL_STATE = {
  project: initialProperty,
  projects: [],
  filteredProjects: [],
  status: "idle",
  error: null,
};

export const getAllPropertiesAction = createAsyncThunk(
  "property/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllProperties();
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

export const getPropertyByIdAction = createAsyncThunk(
  "property/getById",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await getPropertyById(id);
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

export const addPropertyAction = createAsyncThunk(
  "property/add",
  async (data: Partial<PROJECT_RESPONSE>, { rejectWithValue }) => {
    try {
      const res = await addProperty(data);
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

export const updatePropertyAction = createAsyncThunk(
  "property/update",
  async (
    { id, data }: { id: string; data: Partial<PROJECT_RESPONSE> },
    { rejectWithValue }
  ) => {
    try {
      const res = await updateProperty(id, data);
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

export const deletePropertyAction = createAsyncThunk(
  "property/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await deleteProperty(id);
      return id;
    } catch (error) {
      if (request.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data.message || "Something went wrong"
        );
      } else return rejectWithValue(error as Error);
    }
  }
);

//FILTER PROPERTIES
export const filterPropertyByCategoryAction = createAsyncThunk(
  "property/filterByCategory",
  async (filter: string, { rejectWithValue }) => {
    try {
      const res = await filterPropertyByCategory(filter);
      return res;
    } catch (error) {
      if (request.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data.message || "Something went wrong"
        );
      } else return rejectWithValue(error as Error);
    }
  }
);

export const filterPropertyByClosingInAction = createAsyncThunk(
  "property/filterByClosingIn",
  async (filter: number, { rejectWithValue }) => {
    try {
      const res = await filterPropertyByClosingIn(filter);
      return res;
    } catch (error) {
      if (request.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data.message || "Something went wrong"
        );
      } else return rejectWithValue(error as Error);
    }
  }
);

const propertiesSlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    filterBySearch: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      if (payload === "") {
        state.filteredProjects = state.projects;
      }
      state.filteredProjects = state.projects.filter(
        (project) =>
          project.name.toLowerCase().includes(payload.toLowerCase()) ||
          project.neighborhood.toLowerCase().includes(payload.toLowerCase())
      );
      console.log(state.filteredProjects);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllPropertiesAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projects = action.payload.data.projects.map(
          (item: PROJECT_RESPONSE) => mapProjectToModel(item)
        );
        state.filteredProjects = state.projects;
      })
      .addCase(addPropertyAction.fulfilled, (state, action) => {
        toast.success(action.payload.message);
        state.status = "succeeded";
      })
      .addCase(getPropertyByIdAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.project = mapProjectToModel(action.payload.data);
      })
      .addCase(updatePropertyAction.fulfilled, (state, action) => {
        const updatedProperty = action.payload.data;

        const userIndex = state.filteredProjects.findIndex(
          (user) => user._id === updatedProperty._id
        );
        if (userIndex !== -1) {
          state.filteredProjects[userIndex] = {
            ...state.filteredProjects[userIndex],
            ...updatedProperty,
          };
          // toast.success(action.payload.message);
        }
        toast.success(action.payload.message);
        state.status = "succeeded";
      })
      .addCase(deletePropertyAction.fulfilled, (state, action) => {
        toast.success("Project deleted!");
        state.status = "succeeded";
        state.projects = state.projects.filter(
          (item) => item._id !== action.payload
        );
        state.filteredProjects = state.projects;
      })
      .addCase(filterPropertyByCategoryAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.filteredProjects = action.payload.data.map(
          (item: PROJECT_RESPONSE) => mapProjectToModel(item)
        );
      })
      .addCase(filterPropertyByClosingInAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.filteredProjects = action.payload.data.map(
          (item: PROJECT_RESPONSE) => mapProjectToModel(item)
        );
      });

    builder
      .addMatcher(
        isAnyOf(
          getAllPropertiesAction.pending,
          addPropertyAction.pending,
          getPropertyByIdAction.pending,
          // updatePropertyAction.pending,
          deletePropertyAction.pending,
          filterPropertyByCategoryAction.pending,
          filterPropertyByClosingInAction.pending
        ),
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        isAnyOf(
          getAllPropertiesAction.rejected,
          addPropertyAction.rejected,
          getPropertyByIdAction.rejected,
          updatePropertyAction.rejected,
          deletePropertyAction.rejected,
          filterPropertyByCategoryAction.rejected,
          filterPropertyByClosingInAction.rejected
        ),
        (state, action) => {
          state.status = "failure";
          state.error = action.payload || "Something Went Wrong";
          toast.error(state.error);
        }
      );
  },
});

export const { filterBySearch } = propertiesSlice.actions;

export const propertiesSelector = (state: RootState) => state.Property;

export default propertiesSlice.reducer;
