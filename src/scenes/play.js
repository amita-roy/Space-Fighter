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
    this.ufo = null;
    this.starEnemy = null;
    this.starAlien = null;
    this.mainEnemy = null;

    this.laser = null;
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
      this.starEnemy.height - 40
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
      .setImmovable(true)
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
        this.scene.stop('PlayScene');
        this.scene.start('MenuScene');
      },
      callbackScope: this,
      loop: false,
    });
  }

  createMainEnemyCollider() {
    if (this.mainEnemy) {
      this.physics.add.collider(
        this.mainEnemy,
        this.laser,
        this.restartGame,
        null,
        this
      );
    }
  }

  createUfoCollider() {
    this.physics.add.collider(
      this.ufo && this.ufo,
      this.laser,
      this.restartGame,
      null,
      this
    );
  }

  createStarEnemyCollider() {
    this.physics.add.collider(
      this.starEnemy && this.starEnemy,
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
    this.createUfo();
    this.createStarEnem();

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

    this.time.addEvent({
      delay: 10000,
      callback: this.createBigEnemy,
      callbackScope: this,
      loop: false,
    });

    // this.createBigEnemy();
    this.createPlayerLaser();

    this.handleLaserEvent();

    // this.createMainEnemyCollider();

    this.createUfoCollider();
    this.createStarEnemyCollider();
  }

  update() {
    this.playerMovement();

    this.laser.setX(this.player.x);
    this.repeatLaser();
    this.repeatUfo();
    this.repeatStarEnemy();
    this.createUfoCollider();
    this.createMainEnemyCollider();
    this.createStarEnemyCollider();
  }
}

export default PlayScene;
