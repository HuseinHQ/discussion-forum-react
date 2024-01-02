import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { getLeaderboards } from '../../utils/api';

const ActionType = {
  RECEIVE_LEADERBOARDS: 'RECEIVE_LEADERBOARDS',
};

function receiveLeaderboardsActionCreator(leaderboards) {
  return {
    type: ActionType.RECEIVE_LEADERBOARDS,
    payload: { leaderboards },
  };
}

function asyncReceiveLeaderboards() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const leaderboards = await getLeaderboards();
      dispatch(receiveLeaderboardsActionCreator(leaderboards));
    } catch (error) {
      dispatch({ type: 'error', payload: { error } });
    }
    dispatch(hideLoading());
  };
}

asyncReceiveLeaderboards();

export { ActionType, asyncReceiveLeaderboards };
