import { configureStore } from "@reduxjs/toolkit";

import { baseApi } from "@/store/api/baseApi";
import authReducer from "@/store/slices/authSlice";
import uiReducer from "@/store/slices/uiSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      ui: uiReducer,
      [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
    devTools: process.env.NODE_ENV !== "production",
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];