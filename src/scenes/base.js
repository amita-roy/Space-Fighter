import Phaser from 'phaser';

class BaseScene extends Phaser.Scene {
  constructor(key, config) {
    super(key);
    this.config = config;
    this.screenCenter = [config.width / 2, config.height / 2];
  }

  createMenuBG() {
    this.add.image(0, 0, 'menuMainBG').setOrigin(0);
    this.add.image(0, 0, 'menuTopBG').setOrigin(0);
  }

  create() {
    this.createMenuBG();
  }
}

export default BaseScene;
