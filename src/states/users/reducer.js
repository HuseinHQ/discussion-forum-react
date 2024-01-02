import { ActionType } from './action';

const initialState = {
  users: [],
  error: null,
};

const usersReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionType.RECEIVE_USERS:
      return { ...state, users: action.payload.users };
    case 'error':
      return { ...state, error: action.payload.error };
    default:
      return state;
  }
};

export default usersReducer;
