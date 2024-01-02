import { useEffect, useState } from 'react';
import {
  asyncToggleDownVoteComment,
  asyncToggleUpVoteComment,
} from '../states/threadDetail.js/action';
import { useDispatch } from 'react-redux';
import { object, string } from 'prop-types';
import useAuthUser from './useAuthUser';

export default function useVoteComment({ threadId, commentDetail }) {
  const { authUser } = useAuthUser();
  const [voteType, setVoteType] = useState(0);
  const dispatch = useDispatch();
  const [voteValue, setVoteValue] = useState({
    upVote: 0,
    downVote: 0,
  });

  useEffect(() => {
    commentDetail?.upVotesBy?.forEach((owner) => {
      if (owner.id === authUser?.id) {
        setVoteType(1);
      }
    });

    commentDetail?.downVotesBy?.forEach((owner) => {
      if (owner.id === authUser?.id) {
        setVoteType(-1);
      }
    });
  }, [commentDetail, authUser]);

  useEffect(() => {
    setVoteValue({
      upVote: commentDetail?.upVotesBy?.length,
      downVote: commentDetail?.downVotesBy?.length,
    });
  }, [commentDetail]);

  function upVote() {
    dispatch(asyncToggleUpVoteComment({ voteType, threadId, commentId: commentDetail.id }));

    let newUpVote = voteValue.upVote;
    let newDownVote = voteValue.downVote;
    if (voteType == 1) {
      newUpVote = voteValue.upVote - 1;
    } else if (voteType == 0) {
      newUpVote = voteValue.upVote + 1;
    } else if (voteType == -1) {
      newUpVote = voteValue.upVote + 1;
      newDownVote = voteValue.downVote - 1;
    }

    setVoteValue({
      upVote: newUpVote,
      downVote: newDownVote,
    });

    const newVoteType = voteType != 1 ? 1 : 0;
    setVoteType(newVoteType);
  }

  function downVote() {
    dispatch(asyncToggleDownVoteComment({ voteType, threadId, commentId: commentDetail.id }));

    let newUpVote = voteValue.upVote;
    let newDownVote;
    if (voteType == 1) {
      newDownVote = voteValue.downVote + 1;
      newUpVote = voteValue.upVote - 1;
    } else if (voteType == 0) {
      newDownVote = voteValue.downVote + 1;
    } else if (voteType == -1) {
      newDownVote = voteValue.downVote - 1;
    }

    setVoteValue({
      upVote: newUpVote,
      downVote: newDownVote,
    });

    const newVoteType = voteType != -1 ? -1 : 0;
    setVoteType(newVoteType);
  }

  return { upVote, downVote, voteType, voteValue };
}

useVoteComment.propTypes = {
  threadId: string.isRequired,
  commentDetail: object.isRequired,
};
