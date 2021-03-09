import axios from 'axios';

const client = axios.create({
  baseURL:
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/',
});

const gameID = 'OPTiymL4541WfPxmMYzk';

const fetchLeaderBoard = async () => {
  try {
    const response = await client.get(`${gameID}/scores`);
    return response.data;
  } catch (error) {
    return error;
  }
};
const postScores = (user, score) => {
  try {
    client.post(`${gameID}/scores`, { user, score });
    return 'Score Posted successfully!';
  } catch (error) {
    return error;
  }
};

export { fetchLeaderBoard, postScores };
