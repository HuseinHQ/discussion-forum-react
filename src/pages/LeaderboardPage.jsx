import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncReceiveLeaderboards } from '../states/leaderboard/action';
import LeaderboardList from '../components/LeaderboardList';
import toast from 'react-hot-toast';

export default function LeaderboardPage() {
  const { leaderboards, error } = useSelector((states) => states.leaderboards);
  const dispatch = useDispatch();

  if (error) {
    toast.error(error.message);
  }

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <section className="mt-16 bg-gray-800 mx-auto p-6 md:w-4/5 lg:w-3/5 min-h-[92vh] text-white">
      <div>
        <h1 className="mt-3 mb-2 font-bold text-2xl">Klasemen Pengguna Aktif</h1>
        <LeaderboardList leaderboards={leaderboards} />
      </div>
    </section>
  );
}
