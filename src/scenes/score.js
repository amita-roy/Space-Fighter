import BackgroundScene from './background';
// import BackgroundScene from './background';

class ScoreScene extends BackgroundScene {
  constructor(config) {
    super('ScoreScene', config);
  }

  createBg() {
    const { width, height } = this.config;

    this.add
      .image(width / 2, height / 2, 'scoreBase')
      .setOrigin(0.5)
      .setDepth(3);
  }

  createScore() {
    const { width, height } = this.config;

    const bestScoreText = localStorage.getItem('bestScore');
    this.add
      .text(width / 2, height / 2, `Best Score: ${bestScoreText || 0}`, {
        fill: '#000',
        fontSize: '32px',
      })
      .setOrigin(0.5)
      .setDepth(4);
  }

  create() {
    super.create();
    this.createBg();
    this.createScore();
  }
}

export default ScoreScene;
