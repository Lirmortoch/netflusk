import { createSlice } from "@reduxjs/toolkit";

const appSlicer = createSlice({
  name: 'app',
  initialState: {
    theme: 'dark',
  },
  reducers: {
    setTheme(state, action) {
      return { ...state, theme: action.payload.theme }
    }
  }
});

export const { setTheme } = appSlicer.actions;
export default appSlicer.reducer;