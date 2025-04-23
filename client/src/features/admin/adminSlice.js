import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { adminService } from "./adminService";
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    allusers: [],
    allcomplaints: [],
    allcomments: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.allusers = action.payload;
    });
    builder.addCase(getAllComplaints.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(getAllComplaints.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
    });
    builder.addCase(getAllComplaints.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.allcomplaints = action.payload;
    });
  },
});

export default adminSlice.reducer;

// Get all users

export const getUsers = createAsyncThunk(
  "Admin/Get_users",
  async (__, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    try {
      return await adminService.fetchUsers(token);
    } catch (error) {
      const message = await error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all Complaints

export const getAllComplaints = createAsyncThunk(
  "Admin/Get_Complaints",
  async (__, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    try {
      return await adminService.fetchAllComplaints(token);
    } catch (error) {
      const message = await error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
