import { RootState } from "@/app/store";
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from "@/services/users/userServices";
import { STATUS } from "@/types/common.types";
import { USER } from "@/types/user.types";
import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import request from "axios";
import toast from "react-hot-toast";

type INITIAL_STATE = {
  users: USER[];
  status: STATUS;
  error: any;
};

const initialState: INITIAL_STATE = {
  users: [],
  status: "idle",
  error: null,
};

export const getAllUsersAction = createAsyncThunk(
  "user/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllUsers();
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

export const createUserAction = createAsyncThunk(
  "user/create",
  async (data: Partial<USER>, { rejectWithValue }) => {
    try {
      const res = await createUser(data);
      console.log(res);

      return res;
    } catch (error) {
      if (request.isAxiosError(error)) {
        console.log(error);

        return rejectWithValue(
          error.response?.data.message.replace("Firebase error: ", "") ||
            "Something went wrong"
        );
      } else return rejectWithValue(error as Error);
    }
  }
);

export const deleteUserAction = createAsyncThunk(
  "user/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteUser(id);
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

export const updateUserAction = createAsyncThunk(
  "user/update",
  async (
    { id, data }: { id: string; data: Partial<USER> },
    { rejectWithValue }
  ) => {
    try {
      console.log(id, data);

      const res = await updateUser(id, data);
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createUserAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = [action.payload.data, ...state.users];
        toast.success(action.payload.message);
      })
      .addCase(getAllUsersAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload.data;
      })
      .addCase(deleteUserAction.fulfilled, (state, action) => {
        console.log(action.payload);

        state.status = "succeeded";
        state.users = state.users.filter((user) => user._id !== action.payload);
        console.log(state.users);

        toast.success("User Deleted!");
      })
      .addCase(updateUserAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedUser = action.payload.data;
        const userIndex = state.users.findIndex(
          (user) => user._id === updatedUser._id
        );
        if (userIndex !== -1) {
          state.users[userIndex] = {
            ...state.users[userIndex],
            ...updatedUser,
          };
          toast.success(action.payload.message);
        }
      });
    builder
      .addMatcher(
        isAnyOf(createUserAction.pending, getAllUsersAction.pending),
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        isAnyOf(createUserAction.rejected, getAllUsersAction.rejected),
        (state, action) => {
          state.status = "failure";
          console.log(action.payload);
          state.error = action.payload || "Something Went Wrong";
          toast.error(state.error);
        }
      );
  },
});

export const userSelector = (state: RootState) => state.User;

export default userSlice.reducer;
