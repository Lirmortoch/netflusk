import { createSlice } from "@reduxjs/toolkit";

const appSlicer = createSlice({
  name: 'appSettings',
  initialState: {
    theme: 'light',
    hasAuth: false,
    moviesOrShows: 'movies',
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
    setMovieOrShow(state, action) {
      const newState = { ...state, moviesOrShows: action.payload };
      return newState;
    }
  }
});

const { setTheme, setHasAuth, setMovieOrShow } = appSlicer.actions;

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
const handleSetMovieOrShow = (movieOrShow) => {
  return (dispatch) => {
    dispatch(setMovieOrShow(movieOrShow))
  }
}

export { handleSetTheme, handleSetHasAuth, handleSetMovieOrShow }

export default appSlicer.reducer;