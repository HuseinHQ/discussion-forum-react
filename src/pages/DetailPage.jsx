import { Link } from 'react-router-dom';
import { FaRegThumbsDown, FaRegThumbsUp, FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import { postedAt } from '../utils';
import useVoteThread from '../hooks/useVoteThread';
import useThreadDetail from '../hooks/useThreadDetail';
import CommentList from '../components/CommentList';

export default function DetailPage() {
  const {
    threadDetail,
    threadDetailError,
    authUser,
    commentInput,
    onInputChangeHandler,
    onCommentSubmitHandler,
    buttonClicked,
  } = useThreadDetail();

  const { upVote, downVote, threadUpVoted, threadDownVoted, voteValue } = useVoteThread({
    threadDetail,
    authUser,
    buttonClicked,
  });

  if (threadDetailError) {
    return (
      <section className="mt-16 bg-gray-800 mx-auto p-6 md:w-4/5 lg:w-3/5 min-h-[92vh]"></section>
    );
  }

  return (
    <section className="mt-16 bg-gray-800 mx-auto p-6 md:w-4/5 lg:w-3/5 min-h-[92vh]">
      <div className="text-white">
        <Link className="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
          {'#' + threadDetail?.category}
        </Link>

        <h1 className="mt-3 mb-2 text-white font-bold text-2xl">{threadDetail?.title}</h1>

        <p dangerouslySetInnerHTML={{ __html: threadDetail?.body }} />

        <div className="flex gap-4 mt-3">
          <div className="flex gap-2">
            <div className="flex items-center gap-1">
              {threadUpVoted ? (
                <>
                  {
                    <FaThumbsUp
                      className="hover:cursor-pointer"
                      onClick={() => upVote(threadDetail.id)}
                    />
                  }{' '}
                  {voteValue.upVote}
                </>
              ) : (
                <>
                  {
                    <FaRegThumbsUp
                      className="hover:cursor-pointer"
                      onClick={() => upVote(threadDetail.id)}
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
                      onClick={() => downVote(threadDetail.id)}
                    />
                  }{' '}
                  {voteValue.downVote}
                </>
              ) : (
                <>
                  {
                    <FaRegThumbsDown
                      className="hover:cursor-pointer"
                      onClick={() => downVote(threadDetail.id)}
                    />
                  }{' '}
                  {voteValue.downVote}
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <p>Dibuat oleh</p>
            <img className="rounded-full h-5" src={threadDetail?.owner?.avatar} />
            <p>{threadDetail?.owner?.name}</p>
          </div>

          <p>{postedAt(threadDetail.createdAt)}</p>
        </div>
      </div>

      <div className="text-white mt-3">
        <h2 className="text-lg font-semibold mb-2">Beri Komentar</h2>
        {authUser ? (
          <>
            <textarea
              className="w-full bg-transparent border border-white rounded h-24 p-1"
              value={commentInput}
              onChange={onInputChangeHandler}
            ></textarea>
            <button
              className="w-full bg-gray-600 py-1 hover:bg-gray-700 transition-all rounded"
              onClick={onCommentSubmitHandler}
            >
              Kirim
            </button>
          </>
        ) : (
          <h1>
            <Link to="/login" className="underline text-blue-500">
              Login
            </Link>{' '}
            untuk memberi komentar
          </h1>
        )}
      </div>

      <div className="text-white mt-3">
        <h2 className="text-lg font-semibold mb-2">Komentar ({threadDetail?.comments?.length})</h2>

        <CommentList comments={threadDetail?.comments} threadId={threadDetail?.id} />
      </div>
    </section>
  );
}
