import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { error } from "../utils/logger";

import { createReqToken, createSessionId, getUserInfo } from "../services/authService";

export const createRequestToken = createAsyncThunk(
  'loginSession/createRequestToken', 
  async (_query, thunkAPI) => {
    try {
      const data = await createReqToken();
      localStorage.setItem('tmdb_req_token', JSON.stringify(data));

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
  async (token, thunkAPI) => {
    try {
      const data = await createSessionId(token);
      localStorage.setItem('tmdb_session_id', JSON.stringify(data));

      return data;
    }
    catch (err) {
      error(err);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const getUserData = createAsyncThunk(
  'loginSession/getUserData',
  async (session_id, thunkAPI) => {
    try {
      const data = await getUserInfo(session_id);
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
    loginSessionId: null,
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
        loginSessionId: null,
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
        state.loginSessionId = action.payload;
      })
      .addCase(createSession.rejected, (state, action) => {
        state.loginStatus = 'session-failed';
        state.loginError = action.payload;
      })

      .addCase(getUserData.pending, (state) => {
        state.loginStatus = 'user-loading';
        state.loginError = null;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loginStatus = 'user-succeeded';
        state.loginSession = action.payload;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.loginStatus = 'user-failed';
        state.loginError = action.payload;
      });
  },
});

export const { setUser, clearSession } = loginSessionSlice.actions;
export default loginSessionSlice.reducer;