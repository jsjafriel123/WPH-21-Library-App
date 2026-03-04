import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User, UserProfile, LoanStats } from "@/types/auth";

interface AuthState {
  profile: UserProfile | null;
  loanStats: LoanStats | null;
  reviewsCount: number;
  token: string | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
}

const initialState: AuthState = {
  profile: null,
  loanStats: null,
  reviewsCount: 0,
  token: localStorage.getItem("access_token"),
  // isAuthenticated: !!localStorage.getItem("access_token"),
  isAuthenticated: false,
  isHydrated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        profile: UserProfile;
        loanStats: LoanStats;
        reviewsCount: number;
        token: string;
      }>,
    ) => {
      state.profile = action.payload.profile;
      state.loanStats = action.payload.loanStats;
      state.reviewsCount = action.payload.reviewsCount;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      // !!action.payload.profile && !!action.payload.token;
      state.isHydrated = true;
      localStorage.setItem("access_token", action.payload.token);
    },

    logout: (state) => {
      state.profile = null;
      state.loanStats = null;
      state.reviewsCount = 0;
      state.token = null;
      state.isAuthenticated = false;
      state.isHydrated = true;
      localStorage.removeItem("access_token");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
