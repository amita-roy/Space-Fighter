import BackgroundScene from './background';

class MenuScene extends BackgroundScene {
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

  createMuteButton() {
    const muteButton = this.add
      .image(this.config.width - 70, 100, 'muteButton')
      .setDepth(6)
      .setInteractive()
      .setOrigin(0.5);

    muteButton.on('pointerdown', () => {
      this.sfx.menuStart.stop();
    });
  }

  createMenuBG() {
    this.add.image(0, 0, 'menuTopBG').setOrigin(0).setDepth(4);
  }

  createLogo() {
    const [w, h] = this.screenCenter;
    const logo = this.add
      .image(w + 400, h - 200, 'menuLogo')
      .setInteractive()
      .setDepth(5)
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
        fill: '#fff',
      });
    });
    textGO.on('pointerdown', () => {
      textGO.setStyle({
        fill: '#ff0',
      });
      this.sfx.menuStart.stop();
      this.sfx.buttonClick.play();
      if (menuItem.scene) {
        this.scene.start(menuItem.scene);
      }

      if (menuItem.text === 'Exit') {
        this.game.destroy(true);
      }
    });
  }

  createMenu(menu, setupMenuEvent) {
    let lastPositionY = 0;
    menu.forEach((menuItem) => {
      const menuPosition = [
        this.screenCenter[0] + 400,
        this.screenCenter[1] + lastPositionY,
      ];

      menuItem.textGO = this.add
        .text(...menuPosition, menuItem.text, {
          fontSize: '32px',
          fill: '#fff',
        })
        .setOrigin(0.5, 1)
        .setDepth(5)
        .setShadow(5, 5, '#000', 5);

      lastPositionY += 60;
      setupMenuEvent(menuItem);
    });
  }

  create() {
    super.create();
    this.createMenuBG();
    this.createLogo();
    this.createMuteButton();
    this.createMenu(this.menu, (menuItem) => this.setupMenuEvent(menuItem));
    this.sfx = {
      menuStart: this.sound.add('menuSound'),
      buttonClick: this.sound.add('buttonSound'),
    };
    this.sfx.menuStart.play();
  }
}

export default MenuScene;
