import {
  createComment,
  downVoteComments,
  downVoteThread,
  getThreadDetail,
  neutralizeVoteComments,
  neutralizeVoteThread,
  upVoteComments,
  upVoteThread,
} from '../../utils/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_DETAIL_THREAD',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  ADD_COMMENT: 'ADD_COMMENT',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: { threadDetail },
  };
}

// function clearThreadDetailActionCreator() {
//   return {
//     type: ActionType.CLEAR_THREAD_DETAIL,
//   };
// }

function asyncGetThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const threadDetail = await getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      dispatch({ type: 'error', payload: { error } });
    }

    dispatch(hideLoading());
  };
}

function asyncToggleUpVoteThread({ upVoted, threadId }) {
  return async (dispatch) => {
    try {
      !upVoted ? await upVoteThread(threadId) : await neutralizeVoteThread(threadId);
      asyncGetThreadDetail(threadId);
    } catch (error) {
      dispatch({ type: 'error', payload: { error } });
    }
  };
}

function asyncToggleDownVoteThread({ upVoted, threadId }) {
  return async (dispatch) => {
    try {
      !upVoted ? await downVoteThread(threadId) : await neutralizeVoteThread(threadId);
      asyncGetThreadDetail(threadId);
    } catch (error) {
      dispatch({ type: 'error', payload: { error } });
    }
  };
}

function asyncAddComment({ content, threadId }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await createComment({ content, threadId });
      dispatch(asyncGetThreadDetail(threadId));
    } catch (error) {
      dispatch({ type: 'error', payload: { error } });
    }
    dispatch(hideLoading());
  };
}

function asyncToggleUpVoteComment({ voteType, threadId, commentId }) {
  return async (dispatch) => {
    try {
      voteType != 1
        ? await upVoteComments({ threadId, commentId })
        : await neutralizeVoteComments({ threadId, commentId });

      dispatch(asyncGetThreadDetail(threadId));
    } catch (error) {
      dispatch({ type: 'error', payload: { error } });
    }
  };
}

function asyncToggleDownVoteComment({ voteType, threadId, commentId }) {
  return async (dispatch) => {
    try {
      voteType != -1
        ? await downVoteComments({ threadId, commentId })
        : await neutralizeVoteComments({ threadId, commentId });

      dispatch(asyncGetThreadDetail(threadId));
    } catch (error) {
      dispatch({ type: 'error', payload: { error } });
    }
  };
}

export {
  ActionType,
  asyncGetThreadDetail,
  asyncToggleUpVoteThread,
  asyncToggleDownVoteThread,
  asyncAddComment,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
};
