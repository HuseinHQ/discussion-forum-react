import { ActionType } from './action';

const initialState = {
  authUser: null,
  error: null,
};

const authUserReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionType.SET_AUTH_USER:
      return { ...state, authUser: action.payload.authUser };
    case ActionType.UNSET_AUTH_USER:
      return { ...state, authUser: null };
    case 'error':
      return { ...state, error: action.payload.error };
    default:
      return state;
  }
};

export default authUserReducer;
