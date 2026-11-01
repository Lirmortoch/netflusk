import { configureStore } from '@reduxjs/toolkit'

import appReducer from './appReducer';
import guestSessionReducer from './guestSessionReducer';
import loginSessionReducer from './loginSessionReducer';

const store = configureStore({
  reducer: {
    appSettings: appReducer,
    guestSession: guestSessionReducer,
    loginSession: loginSessionReducer,
  }
});

export default store;