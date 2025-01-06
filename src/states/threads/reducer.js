import { ActionType } from './action';

const initialState = {
  threads: [],
  error: null,
  categories: [],
};

const threadsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return {
        threads: action.payload.threads,
        categories: action.payload.threads.map((thread) => thread.category),
        error: null,
      };
    case 'error':
      return { ...state, error: action.payload.error };
    default:
      return state;
  }
};

export default threadsReducer;
