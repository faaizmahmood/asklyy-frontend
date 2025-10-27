// redux/userSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../utils/apiClient";
// import Cookies from "js-cookie";

type UserProfile = {
  id: string;
  name: string;
  email: string;
  slug: string;
  role?: string;
  status?: string;
  phone?: string;
  companyName?: string;
  verified?: boolean;
};

interface UserState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  loading: false,
  error: null,
};

// Async thunk to fetch profile
export const fetchUserProfile = createAsyncThunk<
  UserProfile,
  void,
  { rejectValue: string }
>("user/fetchUserProfile", async (_, { rejectWithValue }) => {
  try {

    const res = await apiService.get("/user/profile");

    return res.data.data; // Assuming your API returns `{ success, data: user }`

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Failed to fetch profile");
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.profile = null;
      localStorage.removeItem("authToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unknown error";
      });
  },
});

export const {  logout } = userSlice.actions;
export default userSlice.reducer;
