import Phaser from 'phaser';
import menuMainBG from '../assets/images/menuMainBg.jpg';
import menuTopBG from '../assets/images/menuBG.png';
import menuLogo from '../assets/images/menuLogo.png';
import playerSprite from '../assets/images/player.png';
import ufoAlienSprite from '../assets/images/ufo.png';
import mis1Shoot from '../assets/images/mis1Shoot.png';
import mis1Explosion from '../assets/images/mis1Explosion.png';
import starAlien from '../assets/images/starAlien.png';
import bigAlien from '../assets/images/alienshUpdated.png';

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
    this.load.spritesheet('mis1Shoot', mis1Shoot, {
      frameWidth: 30,
      frameHeight: 72,
    });
    this.load.spritesheet('mis1Explosion', mis1Explosion, {
      frameWidth: 106.33,
      frameHeight: 107,
    });
    this.load.spritesheet('starAlien', starAlien, {
      frameWidth: 250.5,
      frameHeight: 274,
    });
    this.load.spritesheet('bigAlien', bigAlien, {
      frameWidth: 255,
      frameHeight: 255,
    });
  }

  create() {
    this.scene.start('PlayScene');
  }
}

export default PreloadScene;
