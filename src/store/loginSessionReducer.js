import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { error } from "../utils/logger";

import { createReqToken, createSessionId, getUserData } from "../services/authService";

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
export const createSession = createAsyncThunk(
  'loginSession/createSession',
  async (query, thunkAPI) => {
    try {
      const data = await createSessionId();
      return data;
    }
    catch (err) {
      error(err);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const getUserInfo = createAsyncThunk(
  'loginSession/getUserData',
  async (query, thunkAPI) => {
    try {
      const data = await getUserData();
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
    loginStatus: 'loginSession-idle',
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
        loginStatus: 'loginSession-idle',
        loginError: null,
      }
    },
  },

  extraReducers: (builder) => {
    builder 
      .addCase(createRequestToken.pending, (state) => {
        state.loginStatus = 'reqToken-loading';
        state.loginError = null;
      })
      .addCase(createRequestToken.fulfilled, (state, action) => {
        state.loginStatus = 'reqToken-succeeded';
        console.log('here --- 1');
        // localStorage.setItem('tmdb_req_token', data);
      })
      .addCase(createRequestToken.rejected, (state, action) => {
        state.loginStatus = 'reqToken-failed';
        state.loginError = action.payload;
      })

      .addCase(createSession.pending, (state) => {
        state.loginStatus = 'session-loading';
        state.loginError = null;
      })
      .addCase(createSession.fulfilled, (state, action) => {
        state.loginStatus = 'session-succeeded';
        state.loginSession = action.payload;
      })
      .addCase(createSession.rejected, (state, action) => {
        state.loginStatus = 'session-failed';
        state.loginError = action.payload;
      })

      .addCase(getUserInfo.pending, (state) => {
        state.loginStatus = 'user-loading';
        state.loginError = null;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.loginStatus = 'user-succeeded';
        state.loginSession = action.payload;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.loginStatus = 'user-failed';
        state.loginError = action.payload;
      });
  },
});

export const { setUser, clearSession } = loginSessionSlice.reducer;
export default loginSessionSlice.reducer;