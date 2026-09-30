import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { error } from "../utils/logger";

import { createReqToken, createSessionId, getUserInfo } from "../services/authService";
import { handleSetIsAuth } from "./appReducer";
import { getErrorMessage, createError, normalizeErrorCode, loginErrorMessages } from "../utils/errorMessages";

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
    seLoginSession(state, action) {
      const loginSession = action.payload;
      return {...state, loginSession}
    },
    setSessionId(state, action) {
      const loginSessionId = action.payload;
      return {...state, loginSessionId}
    },
    setLoginSessionState(state, action) {
      const payload = action.payload;
      return {...state, ...payload}
    },
    setLoginError(state, action) {
      const {loginError, loginStatus} = action.payload;
      return {...state, loginError, loginStatus}

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

export const { seLoginSession, setLoginSessionState, setSessionId, clearSession, setLoginError } = loginSessionSlice.actions;

export const handleRestoreSession = () => {
  return async (dispatch) => {
    try {
      const session = JSON.parse(localStorage.getItem('tmdb_session_id'));
      if (!session?.session_id) throw new Error("SESSION_NOT_FOUND");
      
      const user = await dispatch(getUserData(session.session_id)).unwrap();
      if (!user.id) throw new Error('USER_FETCH_FAILED');

      setSessionId(session);
      dispatch(handleSetIsAuth(true));

      return true
    }
    catch (err) {
      const code = normalizeErrorCode(err);
      const er = createError(code, getErrorMessage(code, loginErrorMessages));
      
      const payload = {
        loginStatus: `${er.error.includes('USER') ? 'user' : 'session'}-failed`,
        loginError: er,
      };

      dispatch(handleSetIsAuth(false));
      dispatch(setLoginError(payload));

      if (code !== 'NETWORK') localStorage.removeItem('tmdb_session_id');

      error(err);
      return false;
    }
  }
}

export default loginSessionSlice.reducer;