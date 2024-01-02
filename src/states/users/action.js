import { register } from '../../utils/api';

const ActionType = {
  RECEIVE_USERS: 'RECEIVE_USERS',
};

function receiveUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: { users },
  };
}

async function asyncRegisterUser({ name, email, password }) {
  try {
    const response = await register({ name, email, password });
    return response;
  } catch (error) {
    throw { ...error };
  }
}

export { ActionType, receiveUsersActionCreator, asyncRegisterUser };
