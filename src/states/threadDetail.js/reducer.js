import { ActionType } from './action';

const initialState = {
  threadDetail: {},
  error: null,
};

const threadDetailReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAIL:
      return { ...state, threadDetail: action.payload.threadDetail };
    case ActionType.CLEAR_THREAD_DETAIL:
      return { ...initialState };
    case 'error':
      return { ...state, error: action.payload.error };
    default:
      return state;
  }
};

export default threadDetailReducer;
