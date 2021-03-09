import BigAlien from '../components/bigEnemy';

const config = { width: 1200, height: 800 };

const bigEnemy = new BigAlien(config);

test('Should instance of BigAlien', () => {
  expect(bigEnemy).toBeInstanceOf(BigAlien);
});

test('Should return an object with all the bigEnemy properties', () => {
  expect(bigEnemy.getDetails()).toBeInstanceOf(Object);
});

test('Should return  positionRange as an instance of array for enemy position on canvas', () => {
  expect(bigEnemy.getDetails().positionRange).toBeInstanceOf(Array);
});

test('Should return  positionRange as an instance of array for enemy position on canvas', () => {
  expect(bigEnemy.getDetails().positionRange).toEqual([120, 650]);
});

test('Should return the bodyVelocity for the bigEnemy', () => {
  expect(bigEnemy.getDetails().bodyVelocity).toBe(50);
});

test('Should return the name of the sprite for bigEnemy', () => {
  expect(bigEnemy.getDetails().sprite).toBe('bigAlien');
});
