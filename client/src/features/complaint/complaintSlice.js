import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { complaintService } from "./complaintService";

const complaintSlice = createSlice({
  name: "complaint",
  initialState: {
    complaints: [],
    singleComplaint: {},
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  reducers: {
    // Define your reducers here
  },
  extraReducers: (builder) => {
    builder.addCase(getComplaints.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(getComplaints.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
    });
    builder.addCase(getComplaints.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.complaints = action.payload;
    });
    builder.addCase(getComplaint.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(getComplaint.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
    });
    builder.addCase(getComplaint.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.singleComplaint = action.payload;
    });
    builder.addCase(raiseComplaint.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(raiseComplaint.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
    });
    builder.addCase(raiseComplaint.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.complaints = [action.payload, ...state.complaints];
    });
    builder.addCase(updateComplaint.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(updateComplaint.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
    });
    builder.addCase(updateComplaint.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.singleComplaint = action.payload;
    });
  },
});

export default complaintSlice.reducer;

// Get all complaints

export const getComplaints = createAsyncThunk(
  "Fetch/complaints",
  async (__, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    try {
      return await complaintService.fetchComplaints(token);
    } catch (error) {
      const message = await error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Get single complaint

export const getComplaint = createAsyncThunk(
  "Fetch/complaint",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try {
      return await complaintService.fetchComplaint(id, token);
    } catch (error) {
      const message = await error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Add complaint

export const raiseComplaint = createAsyncThunk(
  "Add/complaint",
  async (formData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try {
      return await complaintService.addComplaint(formData, token);
    } catch (error) {
      const message = await error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update complaint

export const updateComplaint = createAsyncThunk(
  "Update/complaint",
  async (formData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try {
      return await complaintService.update(formData, token);
    } catch (error) {
      const message = await error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
