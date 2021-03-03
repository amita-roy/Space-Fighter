import Phaser from 'phaser';
import BigAlien from '../components/bigEnemy';
import Laser from '../components/laser';
import StarAlien from '../components/starAlien';
import UfoAlien from '../components/ufoAlien';
import BaseScene from './base';

class PlayScene extends BaseScene {
  constructor(config) {
    super('PlayScene', config);
    this.player = null;
    this.cursors = null;
    this.enemyFrequency = this.config.height / 2;
    this.mainEnemy = null;
    this.enemy = null;
    this.enemies = [];
    this.laser = null;
  }

  createPlayerLaser() {
    const laser = new Laser(this.player.y);
    const laserDetails = laser.getDetails();
    this.laser = this.physics.add
      .sprite(this.player.x, laserDetails.position - 220, laserDetails.sprite)
      .setFlipY(true)
      .setOrigin(0.5, 0);

    this.laser.setVelocityY(-400);

    this.anims.create({
      key: laserDetails.key,
      frames: this.anims.generateFrameNumbers(laserDetails.sprite, {
        start: laserDetails.frameStart,
        end: laserDetails.frameEnd,
      }),
      frameRate: laserDetails.frameRate,
      repeat: -1,
    });
    this.laser.play(laserDetails.key);
  }

  createBigEnemy() {
    const bigEnem = new BigAlien(this.config);
    this.mainEnemy = this.physics.add
      .sprite(this.player.x, 0, bigEnem.sprite)
      .setOrigin(0.5, 0);

    this.mainEnemy.setVelocityY(bigEnem.bodyVelocity);
  }

  initiateEnemy() {
    const enemy0 = new UfoAlien(this.config);
    const enemy2 = new StarAlien(this.config);
    this.enemies.push(enemy0.getDetails(), enemy2.getDetails());
  }

  repeatEnemy() {
    if (this.enemy.y >= this.enemyFrequency) {
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
    this.enemy.play(enemy.key);
  }

  createEnemy() {
    this.enemies.forEach((enemy) => {
      const randomNum = Math.random(0, 200);
      const width = Phaser.Math.Between(...enemy.positionRange);
      this.enemy = this.physics.add
        .sprite(width + randomNum, 0, enemy.sprite)
        .setOrigin(0.5, 0);

      this.enemy.setVelocityY(enemy.bodyVelocity);
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
    this.physics.add.collider(this.enemy, this.laser, this.restartGame);
  }

  create() {
    this.createPlayer();
    this.initiateEnemy();
    this.createEnemy();
    this.createCollider();
    this.cursors = this.input.keyboard.createCursorKeys();
    this.input.keyboard.on('keydown-SPACE', this.createPlayerLaser, this);
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

    this.time.addEvent({
      delay: 10000,
      callback: this.createBigEnemy,
      callbackScope: this,
      loop: true,
    });
  }

  update() {
    this.playerMovement();
    this.repeatEnemy();
    if (this.mainEnemy) {
      this.mainEnemy.setX(this.player.x - 10);
    }
  }
}

export default PlayScene;
