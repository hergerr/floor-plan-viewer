import { configureStore } from "@reduxjs/toolkit";
import modelIdSlice from "./slices/modelIdSlice";

export const store = configureStore({
  reducer: {
    modelId: modelIdSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch