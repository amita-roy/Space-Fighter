import Phaser from 'phaser';
import StarAlien from '../components/starAlien';
import UfoAlien from '../components/ufoAlien';

class BackgroundScene extends Phaser.Scene {
  constructor(key, config) {
    super(key);
    this.config = config;
  }

  mainBg() {
    this.add.image(0, 0, 'menuMainBG').setOrigin(0);
  }

  createStarEnem() {
    const starEnem = new StarAlien(this.config);
    const details = starEnem.getDetails();
    const width = Phaser.Math.Between(...details.positionRange);
    this.starEnemy = this.physics.add
      .sprite(width, 0, details.sprite)
      .setImmovable(true)
      .setOrigin(0.5, 0);

    this.starEnemy.setVelocityY(details.bodyVelocity);
    this.starEnemy.setBodySize(
      this.starEnemy.width - 30,
      this.starEnemy.height - 40,
    );

    this.starEnemyAnims();
  }

  repeatStarEnemy() {
    if (this.starEnemy.y > this.config.height / 2) {
      this.createStarEnem();
    }
  }

  starEnemyAnims() {
    this.anims.create({
      key: 'star',
      frames: this.anims.generateFrameNumbers('starAlien', {
        start: 0,
        end: 1,
      }),
      frameRate: 2,
      repeat: -1,
    });

    this.starEnemy.play('star');
  }

  createUfo() {
    const ufoEnem = new UfoAlien(this.config);
    const details = ufoEnem.getDetails();
    const width = Phaser.Math.Between(...details.positionRange);
    this.ufo = this.physics.add
      .sprite(width, 0, details.sprite)
      .setImmovable(true)
      .setOrigin(0.5, 0);

    this.ufo.setVelocityY(details.bodyVelocity);
    this.ufo.setBodySize(this.ufo.width - 14, this.ufo.height - 34);

    this.ufoAnims();
  }

  repeatUfo() {
    if (this.ufo.y > this.config.height / 2) {
      this.createUfo();
    }
  }

  ufoAnims() {
    this.anims.create({
      key: 'ufo',
      frames: this.anims.generateFrameNumbers('ufoAlienSprite', {
        start: 0,
        end: 14,
      }),
      frameRate: 15,
      repeat: -1,
    });

    this.ufo.play('ufo');
  }

  create() {
    this.mainBg();
    this.createStarEnem();
    this.createUfo();
  }

  update() {
    this.repeatStarEnemy();
    this.repeatUfo();
  }
}

export default BackgroundScene;
