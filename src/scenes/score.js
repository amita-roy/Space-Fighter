import BaseScene from './base';

class ScoreScene extends BaseScene {
  constructor(config) {
    super('ScoreScene', config);
  }

  createBg() {
    const { width, height } = this.config;
    this.add.image(0, 0, 'menuMainBG').setOrigin(0);
    this.add.image(width / 2, height / 2, 'scoreBase').setOrigin(0.5);
  }

  createScore() {
    const { width, height } = this.config;

    const bestScoreText = localStorage.getItem('bestScore');
    this.add
      .text(width / 2, height / 2, `Best Score: ${bestScoreText || 0}`, {
        fill: '#000',
        fontSize: '32px',
      })
      .setOrigin(0.5);
  }

  create() {
    this.createBg();
    this.createScore();
  }
}

export default ScoreScene;
