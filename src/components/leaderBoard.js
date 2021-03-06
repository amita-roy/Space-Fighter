class LeaderBoard {
  constructor() {
    this.scores = [];
  }

  getLeaderBoardScores(data) {
    this.scores = data;
  }

  getScores() {
    console.log(this.scores);
    return this.scores;
  }
}

export default LeaderBoard;
