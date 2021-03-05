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
import scoreBase from '../assets/images/scoreBaseBg.png';
import playBG from '../assets/images/playBG.jpg';
import returnButton from '../assets/images/returnButton.png';
import muteButton from '../assets/images/stopMusic.png';
import gameTitle from '../assets/images/title.png';
import buttonSound from '../assets/audio/button-14.wav';
import misExplosionSound from '../assets/audio/blast.wav';
import misFireSound from '../assets/audio/space_laser.wav';
import peCollision from '../assets/audio/PECollision.wav';
import menuSound from '../assets/audio/menu.wav';

class PreloadScene extends Phaser.Scene {
  constructor(config) {
    super('PreloadScene', config);
  }

  init() {
    this.readyCount = 0;
  }

  ready() {
    this.readyCount += 1;
    if (this.readyCount === 2) {
      this.scene.start('MenuScene');
    }
  }

  preload() {
    const { width, height } = this.cameras.main;
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 2 - 150, height / 2 - 30, 320, 50);

    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 10)}  %`);

      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(
        width / 2 - 150 + 10,
        height / 2 - 30 + 10,
        300 * value,
        30
      );
    });

    // update file progress text
    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset:  ${file.key}`);
    });

    // remove progress bar when complete
    this.load.on(
      'complete',
      function () {
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
        percentText.destroy();
        assetText.destroy();
        this.ready();
      }.bind(this)
    );

    //---------------------------------------
    this.load.image('menuMainBG', menuMainBG);
    this.load.image('menuTopBG', menuTopBG);
    this.load.image('menuLogo', menuLogo);
    this.load.image('scoreBase', scoreBase);
    this.load.image('gameTitle', gameTitle);

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
      frameWidth: 150.5,
      frameHeight: 165,
    });
    this.load.spritesheet('bigAlien', bigAlien, {
      frameWidth: 255,
      frameHeight: 255,
    });
    this.load.image('playBG', playBG);
    this.load.image('returnButton', returnButton);
    this.load.image('muteButton', muteButton);

    this.timedEvent = this.time.delayedCall(2000, this.ready, [], this);

    this.load.audio('buttonSound', buttonSound);
    this.load.audio('misExplosionSound', misExplosionSound);
    this.load.audio('misFireSound', misFireSound);
    this.load.audio('peCollision', peCollision);
    this.load.audio('menuSound', menuSound);
  }
}

export default PreloadScene;
