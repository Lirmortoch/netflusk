import { createSlice } from "@reduxjs/toolkit";

const appSlicer = createSlice({
  name: 'appSettings',
  initialState: {
    theme: 'light',
    hasAuth: false,
  },
  reducers: {
    setTheme(state, action) {
      const newState = { ...state, theme: action.payload };
      return newState;
    },
    setHasAuth(state, action) {
      const newState =  {...state, hasAuth: action.payload };
      return newState;
    },
  }
});

const { setTheme, setHasAuth } = appSlicer.actions;

const handleSetTheme = (theme) => {
  return (dispatch) => {
    localStorage.setItem('app-theme', theme);
    dispatch(setTheme(theme));
  }
}
const handleSetHasAuth = (auth) => {
  return (dispatch) => {
    dispatch(setHasAuth(auth));
  }
}

export { handleSetTheme, handleSetHasAuth }

export default appSlicer.reducer;