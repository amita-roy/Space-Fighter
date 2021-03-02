import Phaser from 'phaser';
import menuMainBG from '../assets/images/menuMainBg.jpg';
import menuTopBG from '../assets/images/menuBG.png';
import menuLogo from '../assets/images/menuLogo.png';

class PreloadScene extends Phaser.Scene {
  constructor(config) {
    super('PreloadScene', config);
  }

  preload() {
    this.load.image('menuMainBG', menuMainBG);
    this.load.image('menuTopBG', menuTopBG);
    this.load.image('menuLogo', menuLogo);
  }

  create() {
    this.scene.start('MenuScene');
  }
}

export default PreloadScene;
