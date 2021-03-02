import BaseScene from './base';

class MenuScene extends BaseScene {
  constructor(config) {
    super('MenuScene', config);
    this.screenCenter = [config.width / 2, config.height / 2];
    this.menu = [
      { scene: 'PlayScene', text: 'Play' },
      { scene: 'ScoreScene', text: 'Score' },
      { scene: 'LeaderBoard', text: 'LeaderBoard' },
      { scene: null, text: 'Exit' },
    ];
  }

  createLogo() {
    const [w, h] = this.screenCenter;
    const logo = this.add
      .image(w + 400, h - 200, 'menuLogo')
      .setInteractive()
      .setOrigin(0.5);

    logo.on('pointerover', () => {
      logo.setFlipX(true);
    });

    logo.on('pointerout', () => {
      logo.setFlipX(false);
    });
  }

  setupMenuEvent(menuItem) {
    const { textGO } = menuItem;
    textGO.setInteractive();

    textGO.on('pointerover', () => {
      textGO.setStyle({ fill: '#ff0' });
    });
    textGO.on('pointerout', () => {
      textGO.setStyle({
        fill: '#000',
      });
    });
    textGO.on('pointerdown', () => {
      textGO.setStyle({
        fill: '#ff0',
      });
      menuItem.scene && this.scene.start(menuItem.scene);

      if (menuItem.text === 'Exit') {
        this.game.destroy(true);
      }
    });
  }

  create() {
    super.createMenuBG();
    this.createLogo();
    this.createMenu(this.menu, (menuItem) => this.setupMenuEvent(menuItem));
  }
}

export default MenuScene;
