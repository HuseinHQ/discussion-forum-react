import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { asyncAddComment, asyncGetThreadDetail } from '../states/threadDetail.js/action';
import toast from 'react-hot-toast';
import useAuthUser from './useAuthUser';

export default function useThreadDetail() {
  const { threadDetail, error: threadDetailError } = useSelector((states) => states.threadDetail);
  const { authUser, authUserError } = useAuthUser();
  const { threadId } = useParams();
  const dispatch = useDispatch();
  const buttonClicked = useRef(false);
  const [commentInput, setCommentInput] = useState('');

  function onInputChangeHandler(e) {
    const { value } = e.target;
    setCommentInput(value);
  }

  function onCommentSubmitHandler() {
    dispatch(asyncAddComment({ content: commentInput, threadId }));
  }

  useEffect(() => {
    dispatch(asyncGetThreadDetail(threadId));
  }, [dispatch, threadId]);

  useEffect(() => {
    if (threadDetailError) {
      toast.error(threadDetailError.message);
    }
  }, [threadDetailError]);

  // useEffect(() => {
  //   if (buttonClicked.current) {
  //     buttonClicked.current = false;
  //     if (authUserError) {
  //       toast.error('Anda harus login sebelum melakukan aksi ini!');
  //     }
  //   }
  // }, [authUserError]);

  return {
    threadDetail,
    threadDetailError,
    authUser,
    authUserError,
    commentInput,
    onInputChangeHandler,
    onCommentSubmitHandler,
    buttonClicked,
  };
}
