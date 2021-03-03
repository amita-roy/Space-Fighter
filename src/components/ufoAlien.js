class UfoAlien {
  constructor(config) {
    this.sprite = 'ufoAlienSprite';
    this.positionRange = [config.width / 10, config.width - 100];
    this.bodyVelocity = 150;
    this.key = 'ufo';
    this.frameStart = 0;
    this.frameEnd = 15;
    this.frameRate = 15;
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

export default UfoAlien;
