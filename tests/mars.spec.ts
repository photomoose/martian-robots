import {createMars, OldMars} from '../src/oldMars';
import {Effect} from 'effect';

describe('Mars', () => {
  it('creating Mars with invalid string should throw', () => {
    expect(() => {
      Effect.runSync(createMars('invalid'));
    }).toThrow('Invalid upper-right coordinates format.');
  });

  it('creating Mars with x coordinate greater than 50 should throw', () => {
    expect(() => {
      Effect.runSync(createMars('51 1'));
    }).toThrow('Invalid upper-right coordinates. Valid coordinates range from 1 to 50.');
  });

  it('creating Mars with y coordinate greater than 50 should throw', () => {
    expect(() => {
      Effect.runSync(createMars('1 51'));
    }).toThrow('Invalid upper-right coordinates. Valid coordinates range from 1 to 50.');
  });

  it('creating Mars with x coordinate less than 1 should throw', () => {
    expect(() => {
      Effect.runSync(createMars('0 1'));
    }).toThrow('Invalid upper-right coordinates. Valid coordinates range from 1 to 50.');
  });

  it('creating Mars with y coordinate less than 1 should throw', () => {
    expect(() => {
      Effect.runSync(createMars('1 0'));
    }).toThrow('Invalid upper-right coordinates. Valid coordinates range from 1 to 50.');
  });

  it('creating Mars with valid coordinates should return instance', () => {
    expect(Effect.runSync(createMars('3 3'))).toEqual({
      upperRight: {
        x: 3,
        y: 3
      }
    });
  });
});
