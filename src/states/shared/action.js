import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { getAllThreads, getAllUsers } from '../../utils/api';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';

function asyncPopulateThreadsAndUsers() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const threads = await getAllThreads();
      dispatch(receiveThreadsActionCreator(threads));
      const users = await getAllUsers();
      dispatch(receiveUsersActionCreator(users));
    } catch (error) {
      dispatch({ type: 'error', payload: { error } });
    }
    dispatch(hideLoading());
  };
}

export { asyncPopulateThreadsAndUsers };
