import { object, string } from 'prop-types';
import { postedAt } from '../utils';
import { FaRegThumbsDown, FaRegThumbsUp, FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import useVoteComment from '../hooks/useVoteComment';

export default function CommentItem({ comment, threadId }) {
  const { upVote, downVote, voteType, voteValue } = useVoteComment({
    threadId,
    commentDetail: comment,
  });

  return (
    <div className="mb-4">
      <div className="flex justify-between">
        <div className="flex gap-2 mb-1">
          <img src={comment.owner.avatar} alt="avatar" className="rounded-full h-6" />
          <p className="font-semibold">{comment.owner.name}</p>
        </div>
        <p>{postedAt(comment.createdAt)}</p>
      </div>
      <p dangerouslySetInnerHTML={{ __html: comment?.content }} />
      <div className="flex gap-2 mt-2">
        <div className="flex items-center gap-1">
          {voteType == 1 ? (
            <>
              {<FaThumbsUp className="hover:cursor-pointer" onClick={() => upVote(comment.id)} />}{' '}
              {voteValue.upVote}
            </>
          ) : (
            <>
              {
                <FaRegThumbsUp
                  className="hover:cursor-pointer"
                  onClick={() => upVote(comment.id)}
                />
              }{' '}
              {voteValue.upVote}
            </>
          )}
        </div>
        <div className="flex items-center gap-1">
          {voteType == -1 ? (
            <>
              {
                <FaThumbsDown
                  className="hover:cursor-pointer"
                  onClick={() => downVote(comment.id)}
                />
              }{' '}
              {voteValue.downVote}
            </>
          ) : (
            <>
              {
                <FaRegThumbsDown
                  className="hover:cursor-pointer"
                  onClick={() => downVote(comment.id)}
                />
              }{' '}
              {voteValue.downVote}
            </>
          )}
        </div>
      </div>
      <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
    </div>
  );
}

CommentItem.propTypes = {
  comment: object.isRequired,
  threadId: string.isRequired,
};
