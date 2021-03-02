import Phaser from 'phaser';

class BaseScene extends Phaser.Scene {
  constructor(key, config) {
    super(key);
    this.config = config;
    this.screenCenter = [config.width / 2, config.height / 2];
  }

  createMenuBG() {
    this.add.image(0, 0, 'menuMainBG').setOrigin(0);
    this.add.image(0, 0, 'menuTopBG').setOrigin(0);
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
        .setShadow(5, 5, '#000', 5);

      lastPositionY += 60;
      setupMenuEvent(menuItem);
    });
  }

  create() {
    this.createMenuBG();
  }
}

export default BaseScene;
