import { configureStore } from '@reduxjs/toolkit'

import appReducer from './appReducer';
import guestSessionReducer from './guestSessionReducer';

const store = configureStore({
  reducer: {
    appSettings: appReducer,
    guestSession: guestSessionReducer,
  }
});

export default store;