import {Mars} from '../src/mars';

describe('Mars', () => {
  it('creating Mars with x coordinate greater than 50 should throw', () => {
    expect(() => {
      Mars.create({ x: 51, y: 1 });
    }).toThrow('Invalid upper-right coordinates. Valid coordinates range from 1 to 50.');
  });

  it('creating Mars with y coordinate greater than 50 should throw', () => {
    expect(() => {
      Mars.create({ x: 1, y: 51 });
    }).toThrow('Invalid upper-right coordinates. Valid coordinates range from 1 to 50.');
  });

  it('creating Mars with x coordinate less than 1 should throw', () => {
    expect(() => {
      Mars.create({x: 0, y: 1 });
    }).toThrow('Invalid upper-right coordinates. Valid coordinates range from 1 to 50.');
  });

  it('creating Mars with y coordinate less than 1 should throw', () => {
    expect(() => {
      Mars.create({ x: 1, y: 0 });
    }).toThrow('Invalid upper-right coordinates. Valid coordinates range from 1 to 50.');
  });

  it('creating Mars with valid coordinates should return instance', () => {
    expect(Mars.create({ x: 3, y: 3 })).toBeDefined();
  });
});
