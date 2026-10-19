import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getNowPlayingMovies as _getNowPlayingMovies, 
         getPopularMovies as _getPopularMovies, 
         getTopRatedMovies as _getTopRatedMovies, 
         getTrendingMovies as _getTrendingMovies, 
         getUpcomingMovies as _getUpcomingMovies, 
} from "../services/movieService";
import { error } from "../utils/logger";

export const getNowPlayingMovies = createAsyncThunk(
  'movieLists/getNowPlayingMovies',
  async (page = 1, thunkAPI) => {
    try {
      const data = await _getNowPlayingMovies(page);
      return data;
    }
    catch (err) {
      error(err);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const getPopularMovies = createAsyncThunk(
  'movieLists/getPopularMovies',
  async (page = 1, thunkAPI) => {
    try {
      const data = await _getPopularMovies(page);
      return data;
    } 
    catch (err) {
      error(err);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

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
    setNowPlaying(state, action) {
      const nowPlaying = action.payload;
      return { ...state, ...nowPlaying, }
    },
    setPopular(state, action) {
      const popular = action.payload;
      return { ...state, popular, }
    },
    setTopRated(state, action) {
      const topRated = action.payload;
      return { ...state, ...topRated, }
    },
    setUpcoming(state, action) {
      const upcoming = action.payload;
      return { ...state, ...upcoming, }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase()
  }
});

export const { setNowPlaying, setPopular, setTopRated, setUpcoming, } = movieListsReducer.actions;


export default movieListsReducer.reducer;