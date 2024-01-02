import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './authUser/reducer';
import usersReducer from './users/reducer';
import threadsReducer from './threads/reducer';
import threadDetailReducer from './threadDetail.js/reducer';
import leaderboardReducer from './leaderboard/reducer';
import { loadingBarReducer } from 'react-redux-loading-bar';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    users: usersReducer,
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
    leaderboards: leaderboardReducer,
    loadingBar: loadingBarReducer,
  },
});

export default store;
