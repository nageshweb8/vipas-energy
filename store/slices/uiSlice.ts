import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface DateRange {
  from: string;
  to: string;
}

export interface UiState {
  sidebarCollapsed: boolean;
  assistantOpen: boolean;
  dateRange: DateRange;
}

const initialState: UiState = {
  sidebarCollapsed: false,
  assistantOpen: false,
  dateRange: {
    from: "2026-05-01",
    to: "2026-05-31",
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
    },
    toggleSidebarCollapsed: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setAssistantOpen: (state, action: PayloadAction<boolean>) => {
      state.assistantOpen = action.payload;
    },
    toggleAssistantOpen: (state) => {
      state.assistantOpen = !state.assistantOpen;
    },
    setDateRange: (state, action: PayloadAction<DateRange>) => {
      state.dateRange = action.payload;
    },
  },
});

export const {
  setSidebarCollapsed,
  toggleSidebarCollapsed,
  setAssistantOpen,
  toggleAssistantOpen,
  setDateRange,
} = uiSlice.actions;

export default uiSlice.reducer;
