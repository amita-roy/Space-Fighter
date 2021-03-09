import UfoAlien from '../components/ufoAlien';

const config = { width: 1200, height: 800 };

const ufo = new UfoAlien(config);

test('Should instance of Laser Object', () => {
  expect(ufo).toBeInstanceOf(UfoAlien);
});

test('Should return an object with all the laser properties', () => {
  expect(ufo.getDetails()).toBeInstanceOf(Object);
});

test('Should return the positionRange for starAlien to aooear on the canvas', () => {
  expect(ufo.getDetails().positionRange).toEqual([120, 1100]);
});

test('Should return the framestart position of sprite', () => {
  expect(ufo.getDetails().frameStart).toEqual(0);
});

test('Should return the frameEnd position of sprite', () => {
  expect(ufo.getDetails().frameEnd).toEqual(14);
});

test('Should return total count of the frames of the starAlien sprite', () => {
  const frames = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  expect(frames.length).toEqual(15);
});

test('Should return the frameRate of starAlien sprite', () => {
  expect(ufo.getDetails().frameRate).toEqual(15);
});

test('Should return the bodyVelocity for the starAlien', () => {
  expect(ufo.getDetails().bodyVelocity).toBe(150);
});

test('Should return the name of the sprite for starAlien', () => {
  expect(ufo.getDetails().sprite).toBe('ufoAlienSprite');
});
