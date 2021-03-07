import axios from 'axios';

const client = axios.create({
  baseURL:
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/',
});

const gameID = 'VrAfrXy1FfQWPBusB1V0';

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
  } catch (error) {
    return error;
  }
};

// nBLiE3xmvt6OEGr5JhHT

export { fetchLeaderBoard, postScores };
