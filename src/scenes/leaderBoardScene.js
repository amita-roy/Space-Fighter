import BackgroundScene from './background';
import fetchScores from '../helper';

class LeaderBoardScene extends BackgroundScene {
  constructor(config) {
    super('LeaderBoardScene', config);
    this.base = null;
    this.loadingText = null;
  }

  createBackground() {
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
      this.scene.stop('LeaderBoardScene');
      this.scene.start('MenuScene');
    });
  }

  createScores(scores) {
    this.loadingText.setVisible(false);
    const { width, height } = this.config;
    const lastPosition = { x: width / 2, y: this.base.height / 2 + 40 };
    if (scores.length) {
      scores.forEach((result) => {
        this.add
          .text(
            lastPosition.x,
            lastPosition.y,
            `${result.user}: ${result.score}`,
            {
              fill: '#000',
              fontSize: '32px',
            }
          )
          .setOrigin(0.5)
          .setAlign()
          .setDepth(4);
        lastPosition.y += 40;
      });
    } else {
      this.add
        .text(width / 2, height / 2, 'No scores to show', {
          fill: '#000',
          fontSize: '32px',
        })
        .setOrigin(0.5)
        .setDepth(4);
    }
  }

  createLoadingScores() {
    const { width, height } = this.config;
    this.loadingText = this.add
      .text(width / 2, height / 2, 'Loading.....', {
        fill: '#000',
        fontSize: '32px',
      })
      .setDepth(4)
      .setOrigin(0.5);
    fetchScores().then((result) => this.createScores(result));
  }

  create() {
    super.create();
    this.createBackground();
    this.createLoadingScores();
    this.createReturnButton();
    this.sfx = {
      buttonClick: this.sound.add('buttonSound'),
    };
  }
}

export default LeaderBoardScene;
