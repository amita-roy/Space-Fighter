class Player {
  constructor(name = '') {
    this.name = name;
    this.score = 0;
  }

  getPlayerInfo() {
    return {
      name: this.name,
      score: this.score,
    };
  }
}

export default Player;
