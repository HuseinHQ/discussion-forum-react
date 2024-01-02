import { ActionType } from './action';

const initialState = {
  leaderboards: [],
  error: null,
};

const leaderboardReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionType.RECEIVE_LEADERBOARDS:
      return { ...state, leaderboards: action.payload.leaderboards };
    case 'error':
      return { ...state, error: action.payload.error };
    default:
      return state;
  }
};

export default leaderboardReducer;
