import Phaser from 'phaser';

const WIDTH = 1200;
const HEIGHT = 800;
const PLAYER_POSITION = {
  x: WIDTH / 2,
  y: HEIGHT,
};

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  screenCenter: PLAYER_POSITION,
};

const scenes = [];
const createScene = (Scene) => new Scene(SHARED_CONFIG);

const initScenes = () => scenes.map(createScene);

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false,
    },
  },
  scene: initScenes(),
  pixelArt: true,
  roundPixels: true,
};

export default config;
