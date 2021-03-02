import BaseScene from './base';

class MenuScene extends BaseScene {
  constructor(config) {
    super('MenuScene', config);
  }

  create() {
    super.createMenuBG();
  }
}

export default MenuScene;
