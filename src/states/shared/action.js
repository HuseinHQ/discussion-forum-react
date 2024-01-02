import { getAllThreads, getAllUsers } from '../../utils/api';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';

function asyncPopulateThreadsAndUsers() {
  return async (dispatch) => {
    try {
      const threads = await getAllThreads();
      dispatch(receiveThreadsActionCreator(threads));
      const users = await getAllUsers();
      dispatch(receiveUsersActionCreator(users));
    } catch (error) {
      dispatch({ type: 'error', payload: { error } });
    }
  };
}

export { asyncPopulateThreadsAndUsers };
