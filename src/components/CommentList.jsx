import { arrayOf, object, string } from 'prop-types';
import CommentItem from './CommentItem';

export default function CommentList({ comments, threadId }) {
  return (
    <>
      {comments?.map((comment) => (
        <CommentItem key={comment.id} threadId={threadId} comment={comment} />
      ))}
    </>
  );
}

CommentList.propTypes = {
  comments: arrayOf(object),
  threadId: string,
};
