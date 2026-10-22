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
export const getTodayTrendingMovies = createAsyncThunk(
  'movieLists/getTodayTrendingMovies',
  async (_query, thunkAPI) => {
    try {
      const data = await _getTrendingMovies();
      return data;
    } 
    catch (err) {
      error(err);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const getWeekTrendingMovies = createAsyncThunk(
  'movieLists/getWeekTrendingMovies',
  async (_query, thunkAPI) => {
    try {
      const data = await _getTrendingMovies('week');
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
    trendingToday: {
      data: null,
      status: 'trendingToday-idle',
      error: null,
    },
    trendingWeek: {
      data: null,
      status: 'trendingWeek-idle',
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
    setTrendingToday(state, action) {
      const trendingToday = action.payload;
      return { ...state, trendingToday, }
    },
    setTrendingWeek(state, action) {
      const trendingWeek = action.payload;
      return { ...state, trendingWeek, }
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

      .addCase(getTodayTrendingMovies.pending, (state) => {
        state.trendingToday.status = 'trendingToday-loading';
        state.trendingToday.error = null;
      })
      .addCase(getTodayTrendingMovies.fulfilled, (state, action) => {
        state.trendingToday.status = 'trendingToday-succeeded';
        state.trendingToday.data = action.payload;
      })
      .addCase(getTodayTrendingMovies.rejected, (state, action) => {
        state.trendingToday.status = 'trendingToday-failed';
        state.trendingToday.error = action.payload;
      })

      .addCase(getWeekTrendingMovies.pending, (state) => {
        state.trendingWeek.status = 'trendingWeek-loading';
        state.trendingWeek.error = null;
      })
      .addCase(getWeekTrendingMovies.fulfilled, (state, action) => {
        state.trendingWeek.status = 'trendingWeek-succeeded';
        state.trendingWeek.data = action.payload;
      })
      .addCase(getWeekTrendingMovies.rejected, (state, action) => {
        state.trendingWeek.status = 'trendingWeek-failed';
        state.trendingWeek.error = action.payload;
      })
  }
});

export const { setNowPlaying, setPopular, setTopRated, setUpcoming, setTrendingToday, } = movieListsSlice.actions;

export default movieListsSlice.reducer;