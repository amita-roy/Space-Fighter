import Phaser from 'phaser';
import BigAlien from '../components/bigEnemy';
import StarAlien from '../components/starAlien';
import UfoAlien from '../components/ufoAlien';
import BaseScene from './base';

class PlayScene extends BaseScene {
  constructor(config) {
    super('PlayScene', config);
    this.player = null;
    this.cursors = null;
    this.enemy1 = null;
    this.enemies = [];
    this.enemyPositionRange = [this.config.width / 10, this.config.width - 100];
  }

  initiateEnemy() {
    const enemy1 = new UfoAlien(this.config);
    const enemy2 = new StarAlien(this.config);
    const mainEnemy = new BigAlien(this.config);
    this.enemies.push(
      enemy1.getDetails(),
      enemy2.getDetails(),
      mainEnemy.getDetails()
    );
  }

  repeatEnemy() {
    if (this.enemy1.y >= this.config.height / 5) {
      this.createEnemy();
    }
  }

  enemyAnimation(enemy) {
    this.anims.create({
      key: enemy.key,
      frames: this.anims.generateFrameNumbers(enemy.sprite, {
        start: enemy.frameStart,
        end: enemy.frameEnd,
      }),
      frameRate: enemy.frameRate,
      repeat: -1,
    });
    this.enemy1.play(enemy.key);
  }

  createEnemy() {
    this.enemies.forEach((enemy) => {
      const randomNum = Math.random(0, 200);
      const width = Phaser.Math.Between(...enemy.positionRange);
      this.enemy1 = this.physics.add
        .sprite(width + randomNum, 0, enemy.sprite)
        .setOrigin(0.5, 0);

      this.enemy1.setVelocityY(enemy.bodyVelocity);
      this.enemyAnimation(enemy);
    });
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
    this.initiateEnemy();
    this.createEnemy();
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
  }

  update() {
    this.playerMovement();
    this.repeatEnemy();
  }
}

export default PlayScene;
