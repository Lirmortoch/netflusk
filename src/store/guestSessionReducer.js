import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { 
  getGuestSession,
} from '../services/authService';

export const createGuestSession = createAsyncThunk(
  'user/getGuestSession',
  async (query, thunkAPI) => {
    try {
      const data = await getGuestSession();
      return data;
    }
    catch (err) {
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
  },

  extraReducers: (builder) => {
    builder
      .addCase(createGuestSession.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createGuestSession.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.guestSession = action.payload.guestSession;
      })
      .addCase(createGuestSession.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.error;
      });
  },
});

// export const { setUser } = userSlice.actions;
export default guestSessionSlice.reducer;