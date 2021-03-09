import StarAlien from '../components/starAlien';

const config = { width: 1200, height: 800 };

const starAlien = new StarAlien(config);

test('Should instance of Laser Object', () => {
  expect(starAlien).toBeInstanceOf(StarAlien);
});

test('Should return an object with all the laser properties', () => {
  expect(starAlien.getDetails()).toBeInstanceOf(Object);
});

test('Should return the positionRange for starAlien to aooear on the canvas', () => {
  expect(starAlien.getDetails().positionRange).toEqual([15, 1150]);
});

test('Should return the framestart position of sprite', () => {
  expect(starAlien.getDetails().frameStart).toEqual(0);
});

test('Should return the frameEnd position of sprite', () => {
  expect(starAlien.getDetails().frameEnd).toEqual(1);
});

test('Should return total count of the frames of the starAlien sprite', () => {
  const frames = [0, 1];
  expect(frames.length).toEqual(2);
});

test('Should return the frameRate of starAlien sprite', () => {
  expect(starAlien.getDetails().frameRate).toEqual(2);
});

test('Should return the bodyVelocity for the starAlien', () => {
  expect(starAlien.getDetails().bodyVelocity).toBe(80);
});

test('Should return the name of the sprite for starAlien', () => {
  expect(starAlien.getDetails().sprite).toBe('starAlien');
});
