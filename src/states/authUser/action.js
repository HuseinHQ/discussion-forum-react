import { getOwnProfile, login, putAccessToken } from '../../utils/api';

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER',
};

function setAuthUserActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

function unsetAuthUserActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authUser: null,
    },
  };
}

function asyncSetAuthUser({ email, password }) {
  return async (dispatch) => {
    try {
      const token = await login({ email, password });
      putAccessToken(token);
      const authUser = await getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      // alert(error.message);
      dispatch({ type: 'error', payload: { error } });
    }
  };
}

function asyncCheckAuthUser() {
  return async (dispatch) => {
    try {
      const authUser = await getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      dispatch({
        type: 'error',
        payload: { error },
      });
    }
  };
}

function asyncUnsetAuthUser() {
  return (dispatch) => {
    dispatch(unsetAuthUserActionCreator());
  };
}

export { ActionType, asyncSetAuthUser, asyncUnsetAuthUser, asyncCheckAuthUser };
