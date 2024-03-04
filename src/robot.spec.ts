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
    'invalid'
  ])('should throw error when setting position with invalid format', (position: string) => {
    expect(() => {
      robot.setPosition(position);
    }).toThrow('Invalid position format.');
  });

  it('should return new position after being successfully set', () => {
    robot.setPosition('1 1 N');
    expect(robot.getPosition()).toBe('1 1 N');
  });
});
