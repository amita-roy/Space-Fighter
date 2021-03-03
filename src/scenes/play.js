import Phaser from 'phaser';
import BaseScene from './base';

class PlayScene extends BaseScene {
  constructor(config) {
    super('PlayScene', config);
    this.player = null;
    this.cursors = null;
    this.enemy1 = null;
    this.enemyPositionRange = [this.config.width / 10, this.config.width - 100];
  }

  createUfoAlien() {
    const width = Phaser.Math.Between(...this.enemyPositionRange);
    this.enemy1 = this.physics.add
      .sprite(width, 0, 'ufoAlienSprite')
      .setOrigin(0.5, 0);

    this.enemy1.setVelocityY(100);
  }

  repeatUfo() {
    if (this.enemy1.y > this.config.height) {
      this.createUfoAlien();
      this.enemy1.play('ufo');
    }
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
    this.explode();
    this.physics.pause();
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.scene.restart();
      },
      loop: false,
    });
  }

  create() {
    this.createPlayer();
    this.createUfoAlien();
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
    this.anims.create({
      key: 'ufo',
      frames: this.anims.generateFrameNumbers('ufoAlienSprite', {
        start: 0,
        end: 14,
      }),
      frameRate: 15,
      repeat: -1,
    });

    this.player.play('fly');
    this.enemy1.play('ufo');
  }

  update() {
    this.playerMovement();
    this.repeatUfo();
  }
}

export default PlayScene;
