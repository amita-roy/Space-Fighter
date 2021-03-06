import fetchLeaderBoard from './api/leaderBoardApi';
import LeaderBoard from './components/leaderBoard';

const leaderBoard = new LeaderBoard();

const fetchScores = async () => {
  try {
    const response = await fetchLeaderBoard();
    leaderBoard.getLeaderBoardScores(response.result);
  } catch (error) {
    console.log('No data found for this city');
  }
};

export default () => {
  fetchScores();
  return leaderBoard.getScores();
};
