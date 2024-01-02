import { arrayOf, object } from 'prop-types';
import LeaderboardItem from './LeaderboardItem';

export default function LeaderboardList({ leaderboards }) {
  return (
    <>
      <div className="flex justify-between mb-3">
        <h2 className="text-lg font-semibold">Pengguna</h2>
        <h2 className="text-lg font-semibold">Score</h2>
      </div>
      <div>
        {leaderboards?.map((leaderboard) => (
          <LeaderboardItem key={leaderboard.user.id} leaderboard={leaderboard} />
        ))}
      </div>
    </>
  );
}

LeaderboardList.propTypes = {
  leaderboards: arrayOf(object).isRequired,
};
