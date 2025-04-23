import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { commentService } from "./commentService";

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  reducers: {
    // Define your reducers here
  },
  extraReducers: (builder) => {
    builder.addCase(getComments.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(getComments.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
    });
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.comments = action.payload;
    });
    builder.addCase(raiseComment.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(raiseComment.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
    });
    builder.addCase(raiseComment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.comments = [action.payload , ...state.comments];
    });
  },
});

export default commentSlice.reducer;

// get Comments

export const getComments = createAsyncThunk(
  "Comment/Get",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try {
      return await commentService.fetchComments(id, token);
    } catch (error) {
      const message = await error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// raise Comment

export const raiseComment = createAsyncThunk(
  "Comment/Raise",
  async (formData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try {
      return await commentService.addComment(formData, token);
    } catch (error) {
      const message = await error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
