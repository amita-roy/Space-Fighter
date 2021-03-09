import Phaser from 'phaser';

class BaseScene extends Phaser.Scene {
  constructor(key, config) {
    super(key);
    this.config = config;
    this.screenCenter = [config.width / 2, config.height / 2];
  }

  createBg() {
    this.add.image(0, 0, 'playBG').setOrigin(0);
  }

  create() {
    this.createBg();
  }
}

export default BaseScene;
