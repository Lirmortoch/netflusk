import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { error } from "../utils/logger"

const movieReducer = createSlice({
  name: 'movies',
  initialState: {
    data: null,
    status: 'movie-idle',
    error: null,
  },

  reducers: {

  }
});


export default movieReducer.reducer;