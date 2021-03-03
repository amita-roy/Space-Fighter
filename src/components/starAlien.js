class StarAlien {
  constructor(config) {
    this.sprite = 'starAlien';
    this.positionRange = [config.width / 50, config.width - 50];
    this.bodyVelocity = 100;
    this.key = 'star';
    this.frameStart = 0;
    this.frameEnd = 1;
    this.frameRate = 2;
  }

  getDetails() {
    return {
      sprite: this.sprite,
      positionRange: this.positionRange,
      bodyVelocity: this.bodyVelocity,
      key: this.key,
      frameStart: this.frameStart,
      frameEnd: this.frameEnd,
      frameRate: this.frameRate,
    };
  }
}

export default StarAlien;
