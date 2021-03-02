import Phaser from 'phaser';

const WIDTH = 1200;
const HEIGHT = 800;

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
};

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
};

export default config;
