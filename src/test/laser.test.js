import Laser from '../components/laser';

const laser = new Laser(400);

test('Should instance of Laser Object', () => {
  expect(laser).toBeInstanceOf(Laser);
});

test('Should return an object with all the laser properties', () => {
  expect(laser.getDetails()).toBeInstanceOf(Object);
});

test('Should return the position of laser on canvas', () => {
  expect(laser.getDetails().position).toEqual(400);
});

test('Should return the framestart position of sprite', () => {
  expect(laser.getDetails().frameStart).toEqual(0);
});

test('Should return the frameEnd position of sprite', () => {
  expect(laser.getDetails().frameEnd).toEqual(9);
});

test('Should return total count of the frames of the laser sprite', () => {
  const frames = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  expect(frames.length).toEqual(10);
});

test('Should return the frameRate of laser sprite', () => {
  expect(laser.getDetails().frameRate).toEqual(10);
});

test('Should return the bodyVelocity for the bigEnemy', () => {
  expect(laser.getDetails().bodyVelocity).toBe(50);
});

test('Should return the name of the sprite for bigEnemy', () => {
  expect(laser.getDetails().sprite).toBe('mis1Shoot');
});
