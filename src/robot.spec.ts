import {Robot} from './robot';
import {Mars} from './mars';

describe('Robot', () => {
  let robot: Robot;

  beforeEach(() => {
    const mars = Mars.create({ x: 2, y: 2});
    robot = new Robot(mars);
  });

  it('should return default position', () => {
    expect(robot.getPosition()).toBe('0 0 N');
  });

  it.each([
    'invalid',
    '0',
    '0 0',
    '-1 0 N',
    '51 0 N',
    '50 51 N',
    '50 50 X'
  ])('should throw error when setting position with invalid format (%s)', (position: string) => {
    expect(() => {
      robot.setPosition(position);
    }).toThrow('Invalid position format.');
  });

  it.each([
    '1 1 N',
    '1 1 E',
    '1 1 S',
    '1 1 W',
  ])('should return new position after being successfully set (%s)', (position: string) => {
    robot.setPosition(position);
    expect(robot.getPosition()).toBe(position);
  });

  it.each([
    ['1 1 N', '1 1 E'],
    ['1 1 E', '1 1 S'],
    ['1 1 S', '1 1 W'],
    ['1 1 W', '1 1 N'],
  ])('should rotate 90 degrees to the right when handling R command (%s)', (position: string, expected: string) => {
    robot.setPosition(position);
    robot.processInstructions('R');
    expect(robot.getPosition()).toBe(expected);
  });

  it.each([
    ['1 1 N', '1 1 W'],
    ['1 1 E', '1 1 N'],
    ['1 1 S', '1 1 E'],
    ['1 1 W', '1 1 S'],
  ])('should rotate 90 degrees to the left when handling L command (%s)', (position: string, expected: string) => {
    robot.setPosition(position);
    robot.processInstructions('L');
    expect(robot.getPosition()).toBe(expected);
  });

  it.each([
    ['1 1 N', '1 2 N'],
    ['1 1 E', '2 1 E'],
    ['1 1 S', '1 0 S'],
    ['1 1 W', '0 1 W'],
  ])('should move one grid point in the direction of orientation when handling F command (%s)', (position: string, expected: string) => {
    robot.setPosition(position);
    robot.processInstructions('F');
    expect(robot.getPosition()).toBe(expected);
  });

  it('should handle multiple instructions', () => {
    robot.setPosition('1 1 E');
    robot.processInstructions('RFRFRFRF');
    expect(robot.getPosition()).toBe('1 1 E');
  });

  it('should throw for instruction strings having length of 100 or more characters', () => {
    expect(() => {
      robot.processInstructions('R'.repeat(100));
    }).toThrow('Invalid instruction length. Instruction strings must be less than 100 characters.');
  });

  it('should throw for unsupported instruction', () => {
    expect(() => {
      robot.processInstructions('X');
    }).toThrow('Instruction string contains unsupported instruction.');
  });

  it.each([
    '2 2 N',
    '2 2 E',
    '0 0 S',
    '0 0 W'
  ])('should be LOST when instructions make it fall off Mars (%s)', (position: string) => {
    robot.setPosition(position);
    robot.processInstructions('F');
    expect(robot.getPosition()).toBe(`${position} LOST`);
  });
});

