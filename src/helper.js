import $ from 'jquery';
import { fetchLeaderBoard, postScores } from './api/leaderBoardApi';

const fetchScores = async () => {
  try {
    const response = await fetchLeaderBoard();
    return response.result;
  } catch (error) {
    return 'No data found for this game';
  }
};

const postPlayerScore = (event) => {
  event.preventDefault();
  const form = $(event.target);
  const player = form.serializeArray()[0].value;
  const score = localStorage.getItem('bestScore');

  postScores(player, score);

  form[0].reset();
};

$('#playerForm').on('submit', postPlayerScore);

export default fetchScores;
