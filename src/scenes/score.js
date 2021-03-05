import BackgroundScene from './background';
// import BackgroundScene from './background';

class ScoreScene extends BackgroundScene {
  constructor(config) {
    super('ScoreScene', config);
    this.base = null;
  }

  createBg() {
    const { width, height } = this.config;

    this.base = this.add
      .image(width / 2, height / 2, 'scoreBase')
      .setOrigin(0.5)
      .setDepth(3);
  }

  createReturnButton() {
    const backButton = this.add
      .image(this.base.width - 15, this.base.height - 15, 'returnButton')
      .setDepth(4)
      .setInteractive()
      .setOrigin(0);

    backButton.on('pointerdown', () => {
      this.sfx.buttonClick.play();
      this.scene.stop('ScoreScene');
      this.scene.start('MenuScene');
    });
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
    this.createReturnButton();
    this.sfx = {
      buttonClick: this.sound.add('buttonSound'),
    };
  }
}

export default ScoreScene;
