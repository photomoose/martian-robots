import {Robot} from './robot';

describe('Robot', () => {
  let robot: Robot;

  beforeEach(() => {
    robot = new Robot();
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
    robot.handleInstruction('R');
    expect(robot.getPosition()).toBe(expected);
  });

  it.each([
    ['1 1 N', '1 1 W'],
    ['1 1 E', '1 1 N'],
    ['1 1 S', '1 1 E'],
    ['1 1 W', '1 1 S'],
  ])('should rotate 90 degrees to the left when handling L command (%s)', (position: string, expected: string) => {
    robot.setPosition(position);
    robot.handleInstruction('L');
    expect(robot.getPosition()).toBe(expected);
  });
});
