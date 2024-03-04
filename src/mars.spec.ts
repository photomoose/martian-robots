import {Mars} from './mars';

describe('Mars', () => {
  it('creating Mars with x coordinate greater than 50 should throw', () => {
    expect(() => {
      Mars.create(51, 1);
    }).toThrow('Invalid coordinates. Valid coordinates range from 1 to 50.');
  });

  it('creating Mars with y coordinate greater than 50 should throw', () => {
    expect(() => {
      Mars.create(1, 51);
    }).toThrow('Invalid coordinates. Valid coordinates range from 1 to 50.');
  });

  it('creating Mars with valid coordinates should return instance', () => {
    expect(Mars.create(3, 3)).toBeDefined();
  });
});
