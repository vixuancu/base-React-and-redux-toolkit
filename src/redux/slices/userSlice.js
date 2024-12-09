import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// First, create the thunk
export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async () => {
    let res = await axios.get("http://localhost:8080/users/all");
    return res.data;
  }
);
const initialState = {
  listUsers: [],
  isLoading: false,
  isError: false,
};

export const userSlice = createSlice({
  name: "counter",
  initialState,

  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchAllUsers.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.listUsers = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.isError = true;
      });
  },
});

export default userSlice.reducer;
