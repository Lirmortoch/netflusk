import { createSlice } from "@reduxjs/toolkit";

const appSlicer = createSlice({
  name: 'appSettings',
  initialState: {
    theme: 'light',
  },
  reducers: {
    setTheme(state, action) {
      return { ...state, theme: action.payload.theme }
    }
  }
});

export const { setTheme } = appSlicer.actions;
export default appSlicer.reducer;