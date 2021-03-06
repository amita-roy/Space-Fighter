import BackgroundScene from './background';
import Scores from '../helper';

const scores = [
  { name: 'ponny', score: '234' },
  { name: 'Dodo', score: '567' },
  { name: 'Dodo', score: '567' },
  { name: 'Dodo', score: '567' },
  { name: 'Dodo', score: '567' },
];

class LeaderBoardScene extends BackgroundScene {
  constructor(config) {
    super('LeaderBoardScene', config);
    this.base = null;
    this.scores = [];
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

  createScores() {
    const { width, height } = this.config;
    const lastPosition = { x: width / 2, y: this.base.height / 2 + 40 };
    if (scores.length) {
      scores.forEach((result) => {
        this.add
          .text(
            lastPosition.x,
            lastPosition.y,
            `${result.name}: ${result.score}`,
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

  create() {
    super.create();
    this.createBackground();
    this.createScores();
    this.createReturnButton();
    this.sfx = {
      buttonClick: this.sound.add('buttonSound'),
    };
  }
}

export default LeaderBoardScene;
