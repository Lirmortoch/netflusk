import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { error } from "../utils/logger"

const movieListsReducer = createSlice({
  name: 'movieLists',
  initialState: {
    nowPlaying: {
      data: null,
      status: 'nowPlaying-idle',
      error: null,
    },
    popular: {
      data: null,
      status: 'popular-idle',
      error: null,
    },
    topRated: {
      data: null,
      status: 'topRated-idle',
      error: null,
    },
    upcoming: {
      data: null,
      status: 'upcoming-idle',
      error: null,
    },
  },

  reducers: {

  }
});


export default movieListsReducer.reducer;