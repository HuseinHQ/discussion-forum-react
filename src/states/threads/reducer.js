import { ActionType } from './action';

const initialState = {
  threads: [],
  error: null,
};

const threadsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return { threads: action.payload.threads, error: null };
    case 'error':
      return { ...state, error: action.payload.error };
    default:
      return state;
  }
};

export default threadsReducer;
