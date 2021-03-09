import Phaser from 'phaser';
import $ from 'jquery';
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
    this.scoreText = '';
    this.mainHealth = 3;
    this.isMainDead = false;
    this.explosion = null;
    this.isMuted = null;
    this.laser = null;
  }

  init(isMuted) {
    this.isMuted = isMuted.mute;
  }

  createMuteMusic() {
    if (this.isMuted) {
      this.sfx.explosions.stop();
      this.sfx.laser.stop();
      this.sfx.peCollision.stop();
    }
  }

  explode() {
    this.explosion.setVisible(true);
    this.sfx.laser.stop();
    this.sfx.explosions.play();
    this.time.addEvent({
      delay: 500,
      callback: () => {
        this.explosion.setVisible(false);
      },
      callbackScope: this,
      loop: false,
    });
  }

  createExplosion(w, h) {
    this.explosion = this.physics.add
      .sprite(w, h, 'mis1Explosion')
      .setOrigin(0.5)
      .setDepth(2)
      .setVisible(false)
      .setFlipY(true);

    this.explosionAnims();
  }

  explosionAnims() {
    this.anims.create({
      key: 'blast',
      frames: this.anims.generateFrameNumbers('mis1Explosion', {
        start: 0,
        end: 8,
      }),
      frameRate: 9,
      repeat: 0,
    });

    this.explosion.play('blast');
  }

  createScore() {
    this.score = 0;
    const bestScore = localStorage.getItem('bestScore');
    this.scoreText = this.add
      .text(16, 16, `Score: ${0}`, {
        fontSize: '32px',
        fill: '#FFF',
      })
      .setDepth(6);
    this.add
      .text(16, 50, `Best Score: ${bestScore || 0}`, {
        fontSize: '18px',
        fill: '#FFF',
      })
      .setDepth(6);
  }

  saveBestScore() {
    const bestScoreText = localStorage.getItem('bestScore');
    const bestScore = bestScoreText && parseInt(bestScoreText, 10);
    const fighterScore = this.score;

    localStorage.setItem('currentScore', fighterScore);

    if (!bestScore || this.score > bestScore) {
      localStorage.setItem('bestScore', this.score);
    }
  }

  decreaseHealth() {
    this.mainHealth -= 1;
    this.score += 0;
  }

  increaseScoreby10() {
    this.score += 10;
    this.scoreText.setText(`Score: ${this.score}`);
  }

  increaseScoreby5() {
    this.score += 5;
    this.scoreText.setText(`Score: ${this.score}`);
  }

  spawnLaser() {
    this.createPlayerLaser();
  }

  spawnStarEnemy() {
    this.createStarEnem();
    this.createStarEnemyCollider();
  }

  spawnUfoEnemy() {
    this.createUfo();
    this.createUfoCollider();
  }

  createStarEnem() {
    const starEnem = new StarAlien(this.config);
    const details = starEnem.getDetails();
    const width = Phaser.Math.Between(...details.positionRange);
    this.starEnemy = this.physics.add
      .sprite(width, 0, details.sprite)
      .setDepth(1)
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
    if (this.starEnemy && this.starEnemy.y > this.config.height / 2) {
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
      .setDepth(1)
      .setImmovable(true)
      .setOrigin(0.5, 0);

    this.ufo.setVelocityY(details.bodyVelocity);
    this.ufo.setBodySize(this.ufo.width - 14, this.ufo.height - 34);

    this.ufoAnims();
  }

  repeatUfo() {
    if (this.ufo && this.ufo.y > this.config.height / 2) {
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
    this.sfx.laser.play();
    this.createMuteMusic();
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
      .setDepth(2)
      .setImmovable(true)
      .setOrigin(0.5, 0);

    this.mainEnemy.setVelocityY(bigEnem.bodyVelocity);
    this.mainEnemy.setBodySize(
      this.mainEnemy.width - 14,
      this.mainEnemy.height - 34,
    );
  }

  createPlayer() {
    const { width, height } = this.config;
    this.player = this.physics.add
      .sprite(width / 2, height, 'playerSprite')
      .setDepth(2)
      .setOrigin(0.5, 1);
    this.player.setBodySize(this.player.width - 20, this.player.height - 38);
  }

  playerMovement() {
    if (this.cursors.left.isDown && this.player.x > 50) {
      this.player.setVelocityX(-300);
    } else if (
      this.cursors.right.isDown
      && this.player.x < this.config.width - 50
    ) {
      this.player.setVelocityX(300);
    } else {
      this.player.setVelocityX(0);
    }
  }

  restartGame() {
    this.sfx.peCollision.play();
    this.physics.pause();
    this.saveBestScore();
    this.time.addEvent({
      delay: 4000,
      callback: () => {
        this.scene.stop('PlayScene');
        this.scene.start('MenuScene');
        $('.left-container').removeClass('hidden');
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
          this.createExplosion(laser.x, laser.y);
          this.explode();
          if (this.mainHealth > 0) {
            laser.destroy();
            this.score += 0;
          } else {
            enemy.destroy();
            laser.destroy();
            this.increaseScoreby10();
            this.spawnMainEnemy();
          }

          this.spawnLaser();
        },
        null,
        this,
      );
    }
  }

  createUfoCollider() {
    this.physics.add.collider(
      this.ufo && this.ufo,
      this.laser,
      (enemy, laser) => {
        this.createExplosion(laser.x, laser.y);
        this.explode();
        enemy.destroy();
        laser.destroy();

        this.increaseScoreby5();
        this.spawnUfoEnemy();
        this.spawnLaser();
      },
      null,
      this,
    );
  }

  createStarEnemyCollider() {
    this.physics.add.collider(
      this.starEnemy && this.starEnemy,
      this.laser,
      (enemy, laser) => {
        this.createExplosion(laser.x, laser.y);
        this.explode();
        enemy.destroy();
        laser.destroy();
        this.increaseScoreby5();
        this.spawnLaser();
        this.spawnStarEnemy();
      },
      null,
      this,
    );
  }

  createPlayerCollider() {
    if (this.starEnemy) {
      this.physics.add.collider(
        this.starEnemy,
        this.player,
        this.restartGame,
        null,
        this,
      );
    }

    if (this.ufo) {
      this.physics.add.collider(
        this.ufo,
        this.player,
        this.restartGame,
        null,
        this,
      );
    }

    if (this.mainEnemy) {
      this.physics.add.collider(
        this.mainEnemy,
        this.player,
        this.restartGame,
        null,
        this,
      );
    }
  }

  repeatMainEnemy() {
    if (this.mainEnemy && this.mainEnemy.y > this.config.height) {
      this.createBigEnemy();
    }
  }

  handleLaserEvent() {
    this.input.keyboard.on('keydown-SPACE', this.fire, this);
    this.createMuteMusic();
  }

  create() {
    super.create();
    this.createPlayer();
    this.createUfo();
    this.createStarEnem();
    this.createScore();

    this.sfx = {
      explosions: this.sound.add('misExplosionSound', { volume: 0.1 }),
      laser: this.sound.add('misFireSound', { volume: 0.1 }),
      peCollision: this.sound.add('peCollision', { volume: 0.1 }),
    };
    this.createMuteMusic();

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
    this.createPlayerCollider();
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
    this.createPlayerCollider();
    this.createMuteMusic();
  }
}

export default PlayScene;
