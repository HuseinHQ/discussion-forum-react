import { createThread } from '../../utils/api';
import { asyncPopulateThreadsAndUsers } from '../shared/action';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: { threads },
  };
}

function asyncAddThreads({ title, body, category }) {
  return async (dispatch) => {
    try {
      await createThread({ title, body, category });
      dispatch(asyncPopulateThreadsAndUsers());
    } catch (error) {
      console.log(error);
      dispatch({ type: 'error', payload: { error } });
    }
  };
}

export { ActionType, receiveThreadsActionCreator, asyncAddThreads };
