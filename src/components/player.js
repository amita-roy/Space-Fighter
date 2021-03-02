class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
    this.isDead = false;
  }

  getPlayerInfo() {
    return {
      name: this.name,
      score: this.score,
    };
  }
}

export default Player;
