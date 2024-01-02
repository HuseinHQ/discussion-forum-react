import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  asyncToggleDownVoteThread,
  asyncToggleUpVoteThread,
} from '../states/threadDetail.js/action';
import toast from 'react-hot-toast';

export default function useVoteThread({ threadDetail, authUser, buttonClicked }) {
  const dispatch = useDispatch();
  const [threadUpVoted, setThreadUpVoted] = useState(false);
  const [threadDownVoted, setThreadDownVoted] = useState(false);
  const [voteValue, setVoteValue] = useState({
    upVote: 0,
    downVote: 0,
  });

  useEffect(() => {
    threadDetail?.upVotesBy?.forEach((userId) => {
      if (userId === authUser?.id) {
        setThreadUpVoted(true);
      }
    });
  }, [threadDetail, authUser]);

  useEffect(() => {
    threadDetail?.downVotesBy?.forEach((userId) => {
      if (userId === authUser?.id) {
        setThreadDownVoted(true);
      }
    });
  }, [threadDetail, authUser]);

  useEffect(() => {
    const upVote = threadDetail?.upVotesBy?.length;
    const downVote = threadDetail?.downVotesBy?.length;

    setVoteValue({ upVote, downVote });
  }, [threadDetail]);

  function upVote() {
    if (!localStorage.accessToken) {
      return toast.error('Anda harus login terlebih dahulu!');
    }
    buttonClicked.current = true;

    setThreadUpVoted(!threadUpVoted);
    threadDownVoted && setThreadDownVoted(!threadDownVoted);

    setVoteValue({
      downVote: threadDownVoted ? voteValue.downVote - 1 : voteValue.downVote,
      upVote: threadUpVoted ? voteValue.upVote - 1 : voteValue.upVote + 1,
    });

    dispatch(asyncToggleUpVoteThread({ upVoted: threadUpVoted, threadId: threadDetail?.id }));
  }

  function downVote() {
    if (!localStorage.accessToken) {
      return toast.error('Anda harus login terlebih dahulu!');
    }
    buttonClicked.current = true;

    threadUpVoted && setThreadUpVoted(!threadUpVoted);
    setThreadDownVoted(!threadDownVoted);

    setVoteValue({
      upVote: threadUpVoted ? voteValue.upVote - 1 : voteValue.upVote,
      downVote: threadDownVoted ? voteValue.downVote - 1 : voteValue.downVote + 1,
    });

    dispatch(asyncToggleDownVoteThread({ downVoted: threadDownVoted, threadId: threadDetail?.id }));
  }

  return { upVote, downVote, threadUpVoted, threadDownVoted, voteValue };
}
