// import Phaser from 'phaser';
import BigAlien from '../components/bigEnemy';
import Laser from '../components/laser';
// import StarAlien from '../components/starAlien';
// import UfoAlien from '../components/ufoAlien';
import BaseScene from './base';

class PlayScene extends BaseScene {
  constructor(config) {
    super('PlayScene', config);
    this.player = null;
    this.cursors = null;
    this.enemyFrequency = this.config.height / 2;
    this.mainEnemy = null;

    this.laser = null;
  }

  createPlayerLaser() {
    const laser = new Laser(this.player.y);
    const laserDetails = laser.getDetails();
    this.laser = this.physics.add
      .sprite(this.player.x, laserDetails.position - 220, laserDetails.sprite)
      .setFlipY(true)
      .setOrigin(0.5, 0);

    this.laser.setVisible(false);

    this.anims.create({
      key: 'laser',
      frames: this.anims.generateFrameNumbers('mis1Shoot', {
        start: 0,
        end: 9,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.laser.play('laser');
  }

  fire() {
    this.laser.setVisible(true).setVelocityY(-400);
  }

  repeatLaser() {
    if (this.laser.y < 400) {
      this.createPlayerLaser();
      this.handleLaserEvent();
    }
  }

  createBigEnemy() {
    const bigEnem = new BigAlien(this.config);
    this.mainEnemy = this.physics.add
      .sprite(this.player.x, 0, bigEnem.sprite)
      .setOrigin(0.5, 0);

    this.mainEnemy.setVelocityY(bigEnem.bodyVelocity);
    this.mainEnemy.setBodySize(
      this.mainEnemy.width - 14,
      this.mainEnemy.height - 34
    );
  }

  createPlayer() {
    const { width, height } = this.config;
    this.player = this.physics.add
      .sprite(width / 2, height, 'playerSprite')
      .setOrigin(0.5, 1);
  }

  playerMovement() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-200);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(200);
    } else {
      this.player.setVelocityX(0);
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }

  restartGame() {
    this.physics.pause();
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.scene.restart();
      },
      loop: false,
    });
  }

  createCollider() {
    this.physics.add.collider(
      this.mainEnemy && this.mainEnemy,
      this.laser,
      this.restartGame,
      null,
      this
    );
  }

  handleLaserEvent() {
    this.input.keyboard.on('keydown-SPACE', this.fire, this);
  }

  create() {
    this.createPlayer();

    this.cursors = this.input.keyboard.createCursorKeys();
    this.anims.create({
      key: 'fly',
      frames: this.anims.generateFrameNumbers('playerSprite', {
        start: 0,
        end: 1,
      }),
      frameRate: 2,
      repeat: -1,
    });

    this.player.play('fly');

    this.createBigEnemy();
    this.createPlayerLaser();

    this.handleLaserEvent();

    this.createCollider();
  }

  update() {
    this.playerMovement();

    this.laser.setX(this.player.x);
    this.repeatLaser();
  }
}

export default PlayScene;
