import { object } from 'prop-types';

export default function LeaderboardItem({ leaderboard }) {
  return (
    <div className="flex justify-between mb-3">
      <div className="flex gap-2 items-center">
        <img src={leaderboard.user.avatar} className="size-10 rounded-full" />
        <p>{leaderboard.user.name}</p>
      </div>
      <p>{leaderboard.score}</p>
    </div>
  );
}

LeaderboardItem.propTypes = {
  leaderboard: object.isRequired,
};
