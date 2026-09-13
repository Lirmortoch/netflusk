import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { error } from "../utils/logger";

import { createReqToken } from "../services/authService";

export const createRequestToken = createAsyncThunk(
  'loginSession/createRequestToken', 
  async (query, thunkAPI) => {
    try {
      const data = await createReqToken();

      return data;
    }
    catch (err) {
      error(err);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);


const loginSessionSlice = createSlice({
  name: "loginSession",
  initialState: {
    loginSession: null,
    loginStatus: 'idle',
    loginError: null,
  },

  reducers: {
    setUser(state, action) {
      const loginSession = action.payload;

      return {...state, loginSession}
    },
    clearSession(state, action) {
      return {
        loginSession: null,
        loginStatus: 'idle',
        loginError: null,
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createGuestSession.pending, (state) => {
        state.loginStatus = 'loading';
        state.loginError = null;
      })
      .addCase(createGuestSession.fulfilled, (state, action) => {
        state.loginStatus = 'succeeded';
        state.loginSession = action.payload;
      })
      .addCase(createGuestSession.rejected, (state, action) => {
        state.loginStatus = 'failed';
        state.loginError = action.payload;
      });
  },
});

export const { setUser, clearSession } = loginSessionSlice.reducer;
export default loginSessionSlice.reducer;