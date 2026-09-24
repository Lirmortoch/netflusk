import { createSlice } from "@reduxjs/toolkit";

const appSlicer = createSlice({
  name: 'appSettings',
  initialState: {
    theme: 'light',
    isAuth: false,
  },
  reducers: {
    setTheme(state, action) {
      const newState = { ...state, theme: action.payload };
      return newState;
    },
    setIsAuth(state, action) {
      const newState =  {...state, isAuth: action.payload };
      return newState;
    },
  }
});

const { setTheme, setIsAuth } = appSlicer.actions;

const handleSetTheme = (theme) => {
  return (dispatch) => {
    localStorage.setItem('app-theme', theme);
    dispatch(setTheme(theme));
  }
}
const handleSetIsAuth = (auth) => {
  return (dispatch) => {
    dispatch(setIsAuth(auth));
  }
}

export { handleSetTheme, handleSetIsAuth }

export default appSlicer.reducer;