import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ModelState {
  value: number | null
}

const initialState: ModelState = {
  value: null,
};

export const modelIdSlice = createSlice({
  name: "modelId",
  initialState,
  reducers: {
    setModelId: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { setModelId } = modelIdSlice.actions;

export default modelIdSlice.reducer;