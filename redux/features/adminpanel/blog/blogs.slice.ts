import { RootState } from "@/app/store";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlog,
  updateBlog,
} from "@/services/blogs/blogsService";
import {
  BLOG_FORM_FIELDS,
  BLOG_MODEL,
  BLOG_RESPONSE,
} from "@/types/blogs.types";
import { STATUS } from "@/types/common.types";
import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  isAnyOf,
} from "@reduxjs/toolkit";
import request from "axios";
import { mapBlogToModel } from "./blogs.mapper";
import toast from "react-hot-toast";

type INITIAL_STATE = {
  blogs: BLOG_MODEL[];
  filteredBlogs: BLOG_MODEL[];
  status: STATUS;
  error: any;
};

const initialState: INITIAL_STATE = {
  blogs: [],
  filteredBlogs: [],
  status: "idle",
  error: null,
};

export const getAllBlogsAction = createAsyncThunk(
  "blog/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllBlogs();
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
export const deleteBlogAction = createAsyncThunk(
  "blog/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteBlog(id);
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

export const getBlogAction = createAsyncThunk(
  "blog/getById",
  async (id: string, { rejectWithValue }) => {
    try {
      const podcast = await getBlog(id);
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

export const addBlogAction = createAsyncThunk(
  "blog/add",
  async (data: Partial<BLOG_FORM_FIELDS>, { rejectWithValue }) => {
    try {
      console.log(data);

      const res = await createBlog(data);
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

export const updateBlogAction = createAsyncThunk(
  "blog/update",
  async (
    { id, data }: { id: string; data: Partial<BLOG_FORM_FIELDS> },
    { rejectWithValue }
  ) => {
    try {
      const res = await updateBlog(id, data);
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

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    filterBySearch: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      if (payload === "") {
        state.filteredBlogs = state.blogs;
      }
      state.filteredBlogs = state.filteredBlogs.filter(
        (blog) =>
          blog.blogTitle.toLowerCase().includes(payload.toLowerCase()) ||
          blog.blogAuthor.authorName
            .toLowerCase()
            .includes(payload.toLowerCase())
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllBlogsAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload.data);

        state.blogs = action.payload.data.blogs.map((item: BLOG_RESPONSE) =>
          mapBlogToModel(item)
        );
        state.filteredBlogs = state.blogs;
      })
      .addCase(deleteBlogAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogs = state.blogs.filter(
          (blog) => blog.blogId !== action.payload
        );
        state.filteredBlogs = state.blogs;
        toast.success("Blog Deleted!");
      })
      .addCase(getBlogAction.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addBlogAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success(action.payload.message);
      })
      .addCase(updateBlogAction.fulfilled, (state, action) => {
        const updatedBlog = action.payload.data;
        console.log(updatedBlog);

        const userIndex = state.filteredBlogs.findIndex(
          (user) => user.blogId === updatedBlog._id
        );
        if (userIndex !== -1) {
          state.filteredBlogs[userIndex] = {
            ...state.filteredBlogs[userIndex],
            ...updatedBlog,
          };
          // toast.success(action.payload.message);
        }
        state.status = "succeeded";
        toast.success(action.payload.message);
      });
    builder
      .addMatcher(
        isAnyOf(
          getAllBlogsAction.pending,
          getBlogAction.pending,
          addBlogAction.pending,
          getAllBlogsAction.pending
          // updateBlogAction.pending
        ),
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        isAnyOf(
          getAllBlogsAction.rejected,
          getBlogAction.rejected,
          addBlogAction.rejected,
          getAllBlogsAction.rejected,
          updateBlogAction.rejected
        ),
        (state, action) => {
          state.status = "failure";
          state.error = action.payload || "Something Went Wrong";
          toast.error(state.error);
        }
      );
  },
});

export const { filterBySearch } = blogSlice.actions;

export const blogSelector = (state: RootState) => state.Blog;

export default blogSlice.reducer;
