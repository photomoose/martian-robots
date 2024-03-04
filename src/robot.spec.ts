import {Robot} from './robot';

describe('Robot', () => {
  test('new robot should return default position', () => {
    const robot = new Robot();
    expect(robot.getPosition()).toBe('0 0 N');
  });
});
