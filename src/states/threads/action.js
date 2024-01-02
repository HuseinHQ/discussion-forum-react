import { createThread } from '../../utils/api';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: { threads },
  };
}

async function asyncAddThreads({ title, body, category }) {
  try {
    const response = await createThread({ title, body, category });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export { ActionType, receiveThreadsActionCreator, asyncAddThreads };
