import Phaser from 'phaser';
import menuMainBG from '../assets/images/menuMainBg.jpg';
import menuTopBG from '../assets/images/menuBG.png';
import menuLogo from '../assets/images/menuLogo.png';
import playerSprite from '../assets/images/player.png';
import ufoAlienSprite from '../assets/images/ufo.png';

class PreloadScene extends Phaser.Scene {
  constructor(config) {
    super('PreloadScene', config);
  }

  preload() {
    this.load.image('menuMainBG', menuMainBG);
    this.load.image('menuTopBG', menuTopBG);
    this.load.image('menuLogo', menuLogo);
    this.load.spritesheet('playerSprite', playerSprite, {
      frameWidth: 104,
      frameHeight: 149,
    });
    this.load.spritesheet('ufoAlienSprite', ufoAlienSprite, {
      frameWidth: 64,
      frameHeight: 64,
    });
  }

  create() {
    this.scene.start('PlayScene');
  }
}

export default PreloadScene;
