import BackgroundScene from './background';
// import fetchLeaderBoard from '../api/leaderBoardApi';
// import LeaderBoard from '../components/leaderBoard';

// const leaderBoard = new LeaderBoard();

// const fetchScores = async () => {
//   try {
//     const response = await fetchLeaderBoard();
//     return response.result;
//   } catch (error) {
//     console.log('No data found for this city');
//   }
// };

// leaderBoard.getLeaderBoardScores(fetchScores());

class LeaderBoardScene extends BackgroundScene {
  constructor(config) {
    super('LeaderBoardScene', config);
    this.base = null;
  }

  createBoardBg() {
    const { width, height } = this.config;

    this.base = this.add
      .image(width / 2, height / 2, 'scoreBase')
      .setOrigin(0.5)
      .setDepth(3);
  }

  createBackButton() {
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

  createBoardScores() {
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
    this.createBoardBg();
    this.createBoardScores();
    this.createBackButton();
    this.sfx = {
      buttonClick: this.sound.add('buttonSound'),
    };
  }
}

export default LeaderBoardScene;
