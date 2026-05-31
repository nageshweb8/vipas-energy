import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { AuthUser } from "@/types/auth";

export interface AuthState {
  token: string;
  user: AuthUser;
  status: "anonymous" | "authenticated";
}

const initialState: AuthState = {
  token: "demo-token",
  user: {
    name: "Nagesh Ch",
    initials: "NC",
    company: "Vipas Energy",
  },
  status: "authenticated",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession: (
      state,
      action: PayloadAction<{ token: string; user: AuthUser }>,
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.status = "authenticated";
    },
    clearSession: () => initialState,
  },
});

export const { clearSession, setSession } = authSlice.actions;

export default authSlice.reducer;
