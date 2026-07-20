import { createSlice } from "@reduxjs/toolkit";

const appSlicer = createSlice({
  name: 'appSettings',
  initialState: {
    theme: 'light',
  },
  reducers: {
    setTheme(state, action) {
      const newState = { ...state, theme: action.payload };
      return newState;
    }
  }
});

const { setTheme } = appSlicer.actions;

const handleSetTheme = (theme) => {
  return (dispatch) => {
    localStorage.setItem('app-theme', theme);
    dispatch(setTheme(theme));
  }
}

export { handleSetTheme }

export default appSlicer.reducer;