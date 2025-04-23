import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authservice } from "./authService";

const userExist = JSON.parse(localStorage.getItem("user"));

const authslice = createSlice({
  name: "auth",
  initialState: {
    user: userExist || null, // Stores the authenticated user's data
    isLoading: false, // Indicates if an authentication request is in progress
    isError: false, // Indicates if there was an error during authentication
    isSuccess: false, // Indicates if the authentication was successful
    message: "", // Stores any error or success messages
  },
  reducers: {
    // Define your reducers here
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false
      state.message = action.payload
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.user = null;
    });
  },
});

export default authslice.reducer;

// Register user

export const registerUser = createAsyncThunk(
  "Auth/Register",
  async (formData, thunkAPI) => {
    try {
      return await authservice.register(formData);
    } catch (error) {
      const message = await error.response.data.msg
      return thunkAPI.rejectWithValue(message)
    }
  }
);
// Login user

export const loginUser = createAsyncThunk(
  "Auth/Login",
  async (formData, thunkAPI) => {
    try {
      return await authservice.login(formData);
    } catch (error) {
      const message = await error.response.data.msg
      return thunkAPI.rejectWithValue(message)
    }
  }
);

// Logout User

export const logoutUser = createAsyncThunk("Auth/Logout", async () => {
  localStorage.removeItem("user");
});
