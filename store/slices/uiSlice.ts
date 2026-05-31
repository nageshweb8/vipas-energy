import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  isNavigationOpen: boolean;
}

const initialState: UiState = {
  isNavigationOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setNavigationOpen: (state, action: PayloadAction<boolean>) => {
      state.isNavigationOpen = action.payload;
    },
    toggleNavigation: (state) => {
      state.isNavigationOpen = !state.isNavigationOpen;
    },
  },
});

export const { setNavigationOpen, toggleNavigation } = uiSlice.actions;

export default uiSlice.reducer;