import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type AppTheme = "light" | "dark";

export interface DateRange {
  from: string;
  to: string;
  fromLabel: string;
  toLabel: string;
}

export interface UiState {
  sidebarCollapsed: boolean;
  assistantOpen: boolean;
  theme: AppTheme;
  dateRange: DateRange;
}

const initialState: UiState = {
  sidebarCollapsed: false,
  assistantOpen: false,
  theme: "light",
  dateRange: {
    from: "2025-05-12",
    to: "2025-05-18",
    fromLabel: "May 12",
    toLabel: "May 18, 2025",
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
    setTheme: (state, action: PayloadAction<AppTheme>) => {
      state.theme = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
  },
});

export const {
  setSidebarCollapsed,
  toggleSidebarCollapsed,
  setAssistantOpen,
  toggleAssistantOpen,
  setDateRange,
  setTheme,
  toggleTheme,
} = uiSlice.actions;

export default uiSlice.reducer;
