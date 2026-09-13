import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { 
  getGuestSession,
} from '../services/authService';
import { error } from "../utils/logger"

export const createGuestSession = createAsyncThunk(
  'guestSession/getGuestSession',
  async (query, thunkAPI) => {
    try {
      const data = await getGuestSession();
  
      return data;
    }
    catch (err) {
      error(err);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const guestSessionSlice = createSlice({
  name: 'guestSession',
  initialState: {
    guestSession: null,
    status: 'idle',
    error: null,
  },

  reducers: {
    setUser(state, action) {
      const guestSession = action.payload;

      return {...state, guestSession};
    },
    clearSession(state, action) {
      return {
        loginSession: null,
        status: 'idle',
        error: null,
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createGuestSession.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createGuestSession.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.guestSession = action.payload;
      })
      .addCase(createGuestSession.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setUser, clearSession } = userSlice.actions;
export default guestSessionSlice.reducer;