import { configureStore } from '@reduxjs/toolkit'

import appReducer from './appReducer';
import guestSessionReducer from './guestSessionReducer';
import loginSessionReducer from './loginSessionReducer';
import movieListReducer from './movieListsReducer';

const store = configureStore({
  reducer: {
    appSettings: appReducer,
    guestSession: guestSessionReducer,
    loginSession: loginSessionReducer,
    movieLists: movieListReducer,
  }
});

export default store;