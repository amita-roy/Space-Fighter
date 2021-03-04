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
    this.score = 0;
    this.mainHealth = 3;
    this.isMainDead = false;

    this.laser = null;
  }

  decreaseHealth() {
    this.mainHealth -= 1;
    this.score += 0;
  }

  increaseScoreby20() {
    this.score += 20;
  }

  increaseScoreby10() {
    this.score += 10;
  }

  spawnLaser() {
    this.createPlayerLaser();
  }

  spawnStarEnemy() {
    this.createStarEnem();
  }

  spawnUfoEnemy() {
    this.createUfo();
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
      .sprite(this.player.x, laserDetails.position - 100, laserDetails.sprite)
      .setFlipY(true)
      .setDepth(1)
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
    if (this.laser.y < 500) {
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
      .setDepth(2)
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

  spawnMainEnemy() {
    this.mainHealth = 3;
    this.repeatMainEnemy();
  }

  createMainEnemyCollider() {
    if (this.mainEnemy) {
      this.physics.add.collider(
        this.mainEnemy,
        this.laser,
        (enemy, laser) => {
          this.decreaseHealth();

          if (this.mainHealth > 0) {
            laser.destroy();
            this.score += 0;
          } else {
            enemy.destroy();
            laser.destroy();
            this.increaseScoreby20();
            this.spawnMainEnemy();
          }
          this.spawnLaser();
        },
        null,
        this
      );
    }
  }

  createUfoCollider() {
    this.physics.add.collider(
      this.ufo && this.ufo,
      this.laser,
      (enemy, laser) => {
        enemy.destroy();
        laser.destroy();
        this.increaseScoreby10();
        this.spawnUfoEnemy();
        this.spawnLaser();
      },
      null,
      this
    );
  }

  createStarEnemyCollider() {
    this.physics.add.collider(
      this.starEnemy && this.starEnemy,
      this.laser,
      (enemy, laser) => {
        enemy.destroy();
        laser.destroy();
        this.increaseScoreby10();
        this.spawnLaser();
        this.spawnStarEnemy();
      },
      null,
      this
    );
  }

  repeatMainEnemy() {
    if (this.mainEnemy && this.mainEnemy.y > this.config.height) {
      this.createBigEnemy();
    }
  }

  handleLaserEvent() {
    this.input.keyboard.on('keydown-SPACE', this.fire, this);
  }

  create() {
    super.create();
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

    this.createPlayerLaser();

    this.handleLaserEvent();
    this.time.addEvent({
      delay: 10000,
      callback: this.createBigEnemy,
      callbackScope: this,
      loop: true,
    });

    this.createUfoCollider();
    this.createStarEnemyCollider();
  }

  update() {
    this.playerMovement();

    this.laser.setX(this.player.x);
    this.repeatLaser();
    this.repeatMainEnemy();
    this.repeatUfo();
    this.repeatStarEnemy();
    this.createUfoCollider();
    this.createMainEnemyCollider();
    this.createStarEnemyCollider();
  }
}

export default PlayScene;
