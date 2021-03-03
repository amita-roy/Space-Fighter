class Laser {
  constructor(position) {
    this.sprite = 'mis1Shoot';
    this.position = position;
    this.bodyVelocity = 50;
    this.key = 'laser';
    this.frameStart = 0;
    this.frameEnd = 9;
    this.frameRate = 10;
  }

  getDetails() {
    return {
      sprite: this.sprite,
      position: this.position,
      bodyVelocity: this.bodyVelocity,
      key: this.key,
      frameStart: this.frameStart,
      frameEnd: this.frameEnd,
      frameRate: this.frameRate,
    };
  }
}

export default Laser;
