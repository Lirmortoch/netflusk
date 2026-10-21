import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getNowPlayingMovies as _getNowPlayingMovies, 
         getPopularMovies as _getPopularMovies, 
         getTopRatedMovies as _getTopRatedMovies,  
         getUpcomingMovies as _getUpcomingMovies, 
         getTrendingMovies as _getTrendingMovies,
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
export const getTopRatedMovies = createAsyncThunk(
  'movieLists/getTopRatedMovies',
  async (page = 1, thunkAPI) => {
    try {
      const data = await _getTopRatedMovies(page);
      return data;
    } 
    catch (err) {
      error(err);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const getUpcomingMovies = createAsyncThunk(
  'movieLists/getUpcomingMovies',
  async (page = 1, thunkAPI) => {
    try {
      const data = await _getUpcomingMovies(page);
      return data;
    } 
    catch (err) {
      error(err);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const getTrendingMovies = createAsyncThunk(
  'movieLists/getTrendingMovies',
  async (time_window = 'day', thunkAPI) => {
    try {
      const data = await _getTrendingMovies(time_window);
      return data;
    } 
    catch (err) {
      error(err);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const movieListsSlice = createSlice({
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
    trending: {
      data: null,
      status: 'upcoming-idle',
      error: null,
    },
  },

  reducers: {
    setNowPlaying(state, action) {
      const nowPlaying = action.payload;
      return { ...state, nowPlaying, }
    },
    setPopular(state, action) {
      const popular = action.payload;
      return { ...state, popular, }
    },
    setTopRated(state, action) {
      const topRated = action.payload;
      return { ...state, topRated, }
    },
    setUpcoming(state, action) {
      const upcoming = action.payload;
      return { ...state, upcoming, }
    },
    setTrending(state, action) {
      const trending = action.payload;
      return { ...state, trending, }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getNowPlayingMovies.pending, (state) => {
        state.nowPlaying.status = 'nowPlaying-loading';
        state.nowPlaying.error = null;
      })
      .addCase(getNowPlayingMovies.fulfilled, (state, action) => {
        state.nowPlaying.status = 'nowPlaying-succeeded';
        state.nowPlaying.data = action.payload;
      })
      .addCase(getNowPlayingMovies.rejected, (state, action) => {
        state.nowPlaying.status = 'nowPlaying-failed';
        state.nowPlaying.error = action.payload;
      })

      .addCase(getPopularMovies.pending, (state) => {
        state.popular.status = 'popular-loading';
        state.popular.error = null;
      })
      .addCase(getPopularMovies.fulfilled, (state, action) => {
        state.popular.status = 'popular-succeeded';
        state.popular.data = action.payload;
      })
      .addCase(getPopularMovies.rejected, (state, action) => {
        state.popular.status = 'popular-failed';
        state.popular.error = action.payload;
      })

      .addCase(getTopRatedMovies.pending, (state) => {
        state.topRated.status = 'topRated-loading';
        state.topRated.error = null;
      })
      .addCase(getTopRatedMovies.fulfilled, (state, action) => {
        state.topRated.status = 'topRated-succeeded';
        state.topRated.data = action.payload;
      })
      .addCase(getTopRatedMovies.rejected, (state, action) => {
        state.topRated.status = 'topRated-failed';
        state.topRated.error = action.payload;
      })

      .addCase(getUpcomingMovies.pending, (state) => {
        state.upcoming.status = 'upcoming-loading';
        state.upcoming.error = null;
      })
      .addCase(getUpcomingMovies.fulfilled, (state, action) => {
        state.upcoming.status = 'upcoming-succeeded';
        state.upcoming.data = action.payload;
      })
      .addCase(getUpcomingMovies.rejected, (state, action) => {
        state.upcoming.status = 'upcoming-failed';
        state.upcoming.error = action.payload;
      })

      .addCase(getTrendingMovies.pending, (state) => {
        state.trending.status = 'trending-loading';
        state.trending.error = null;
      })
      .addCase(getTrendingMovies.fulfilled, (state, action) => {
        state.trending.status = 'trending-succeeded';
        state.trending.data = action.payload;
      })
      .addCase(getTrendingMovies.rejected, (state, action) => {
        state.trending.status = 'trending-failed';
        state.trending.error = action.payload;
      })
  }
});

export const { setNowPlaying, setPopular, setTopRated, setUpcoming, } = movieListsSlice.actions;


export default movieListsSlice.reducer;