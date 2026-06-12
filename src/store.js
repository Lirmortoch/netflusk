import { configureStore } from '@reduxjs/toolkit'

import appReducer from './store/appReducer';

const store = configureStore({
  reducer: {
    appSettings: appReducer,
  }
});

export default store;