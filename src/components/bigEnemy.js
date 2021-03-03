class BigAlien {
  constructor(config) {
    this.sprite = 'bigAlien';
    this.positionRange = [config.width / 10, config.width / 2 + 50];
    this.bodyVelocity = 50;
    this.key = 'bigAlien';
    this.frameStart = 0;
    this.frameEnd = 0;
    this.frameRate = 1;
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

export default BigAlien;
