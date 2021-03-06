class LeaderBoard {
  constructor() {
    this.scores = [];
  }

  getLeaderBoardScores(data) {
    this.scores = data;
  }

  getScores() {
    return this.scores;
  }
}

export default LeaderBoard;
