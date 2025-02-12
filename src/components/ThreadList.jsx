import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ThreadItem from './ThreadItem';
import { asyncPopulateThreadsAndUsers } from '../states/shared/action';
import { useSearchParams } from 'react-router-dom';
import CategoryList from './CategoryList';

export default function ThreadList() {
  const dispatch = useDispatch();
  const { threads } = useSelector((states) => states.threads);
  const { categories } = useSelector((states) => states.threads);
  const { users } = useSelector((states) => states.users);

  const [threadsToDisplay, setThreadsToDisplay] = useState(threads);

  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  function filterThreadsByCategory() {
    if (category) {
      return threads.filter((thread) => thread.category === category);
    } else {
      return threads;
    }
  }

  useEffect(() => {
    const result = filterThreadsByCategory();
    setThreadsToDisplay(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, threads]);

  useEffect(() => {
    dispatch(asyncPopulateThreadsAndUsers());
  }, [dispatch]);

  const threadList = threadsToDisplay.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id == thread.ownerId),
  }));

  return (
    <section className="p-6 mx-auto mt-16 bg-gray-800 min-h-lvh md:w-4/5 lg:w-3/5">
      <CategoryList categories={categories} />
      {threadList.map((thread) => (
        <ThreadItem key={thread.id} thread={thread} />
      ))}
    </section>
  );
}
