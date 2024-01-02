import { object } from 'prop-types';
import {
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaThumbsDown,
  FaThumbsUp,
  FaRegCommentDots,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useAuthUser from '../hooks/useAuthUser';
import useVoteThread from '../hooks/useVoteThread';
import { useRef } from 'react';
import { postedAt } from '../utils';

export default function ThreadItem({ thread }) {
  const { authUser } = useAuthUser();
  const buttonClicked = useRef(false);
  const { voteValue, upVote, downVote, threadUpVoted, threadDownVoted } = useVoteThread({
    threadDetail: thread,
    authUser,
    buttonClicked,
  });

  return (
    <div className="text-white">
      <Link
        to={`/?category=${thread.category}`}
        className="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300"
      >
        {'#' + thread?.category}
      </Link>

      <div className="flex">
        <Link to={`/threads/${thread.id}`}>
          <h1 className="text-blue-500 font-semibold text-lg">{thread?.title}</h1>
        </Link>
      </div>
      <p dangerouslySetInnerHTML={{ __html: thread?.body }} />

      <div className="flex gap-4 mt-3 items-center text-sm">
        <div className="flex gap-2">
          <div className="flex items-center gap-1">
            {threadUpVoted ? (
              <>
                {<FaThumbsUp className="hover:cursor-pointer" onClick={() => upVote(thread.id)} />}{' '}
                {voteValue.upVote}
              </>
            ) : (
              <>
                {
                  <FaRegThumbsUp
                    className="hover:cursor-pointer"
                    onClick={() => upVote(thread.id)}
                  />
                }{' '}
                {voteValue.upVote}
              </>
            )}
          </div>
          <div className="flex items-center gap-1">
            {threadDownVoted ? (
              <>
                {
                  <FaThumbsDown
                    className="hover:cursor-pointer"
                    onClick={() => downVote(thread.id)}
                  />
                }{' '}
                {voteValue.downVote}
              </>
            ) : (
              <>
                {
                  <FaRegThumbsDown
                    className="hover:cursor-pointer"
                    onClick={() => downVote(thread.id)}
                  />
                }{' '}
                {voteValue.downVote}
              </>
            )}
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <FaRegCommentDots />
          <p>{thread?.totalComments}</p>
        </div>
        <p>{postedAt(thread?.createdAt)}</p>
        <p>
          Dibuat oleh <span className="font-semibold">{thread?.user?.name}</span>
        </p>
      </div>
      <hr className="h-px my-5 bg-gray-200 border-0 dark:bg-gray-700" />
    </div>
  );
}

ThreadItem.propTypes = {
  thread: object,
};
