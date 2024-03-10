import {
  createRobot,
  getPosition,
  OldRobot,
  processInstruction,
  processInstructions,
  Robot,
  setPosition
} from '../src/oldRobot';
import {OldMars} from '../src/oldMars';
import {Instruction} from '../src/instructions';
import {Right} from '../src/instructions';
import {Left} from '../src/instructions';
import {Forward} from '../src/instructions';
import {Effect, pipe} from 'effect';

describe('Robot', () => {
  let newRobot: Robot;
  let robot: OldRobot;
  let mars: OldMars;
  let instructions: readonly Instruction[];

  beforeEach(() => {
    instructions = [new Left(), new Right(), new Forward()];
    mars = OldMars.create('2 2');
    robot = new OldRobot(mars, instructions);
    newRobot = createRobot();
  });

  it('should return default position', () => {
    expect(Effect.runSync(getPosition(newRobot))).toBe('0 0 N');
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
      Effect.runSync(setPosition(position));
    }).toThrow('Invalid position format.');
  });

  it.each([
    '1 1 N',
    '1 1 E',
    '1 1 S',
    '1 1 W',
  ])('should return new position after being successfully set (%s)', (position: string) => {
    const effect = pipe(
      position,
      setPosition,
      Effect.flatMap(getPosition)
    );

    expect(Effect.runSync(effect)).toBe(position);
  });

  it.each([
    ['1 1 N', '1 1 E'],
    ['1 1 E', '1 1 S'],
    ['1 1 S', '1 1 W'],
    ['1 1 W', '1 1 N'],
  ])('should rotate 90 degrees to the right when handling R command (%s)', (position: string, expected: string) => {
    const effect = pipe(
      position,
      setPosition,
      Effect.flatMap(processInstruction('R')),
      Effect.flatMap(getPosition)
    );

    expect(Effect.runSync(effect)).toBe(expected);
  });

  it.each([
    ['1 1 N', '1 1 W'],
    ['1 1 E', '1 1 N'],
    ['1 1 S', '1 1 E'],
    ['1 1 W', '1 1 S'],
  ])('should rotate 90 degrees to the left when handling L command (%s)', (position: string, expected: string) => {
    const effect = pipe(
      position,
      setPosition,
      Effect.flatMap(processInstruction('L')),
      Effect.flatMap(getPosition)
    );

    expect(Effect.runSync(effect)).toBe(expected);
  });

  it.each([
    ['1 1 N', '1 2 N'],
    ['1 1 E', '2 1 E'],
    ['1 1 S', '1 0 S'],
    ['1 1 W', '0 1 W'],
  ])('should move one grid point in the direction of orientation when handling F command (%s)', (position: string, expected: string) => {
    const effect = pipe(
      position,
      setPosition,
      Effect.flatMap(processInstruction('F')),
      Effect.flatMap(getPosition)
    );

    expect(Effect.runSync(effect)).toBe(expected);
  });

  it('should handle multiple instructions', () => {
    const effect = pipe(
      setPosition('1 1 E'),
      Effect.flatMap((r) => pipe(
        r,
        processInstructions('RFRFRFRF'),
      )),
      Effect.flatMap(getPosition)
    );

    expect(Effect.runSync(effect)).toBe('1 1 E');
  });

  it('should throw for instruction strings having length of 100 or more characters', () => {
    expect(() => {
      robot.processInstructions('R'.repeat(100));
    }).toThrow('Invalid instruction length. Instruction strings must be less than 100 characters.');
  });

  it('should throw for unsupported instruction', () => {
    const effect = pipe(
      newRobot,
      processInstruction('X'),
    );

    expect(() => {
      Effect.runSync(effect);
    }).toThrow('Instruction string contains unsupported instruction.');
  });

  it.each([
    '2 2 N',
    '2 2 E',
    '0 0 S',
    '0 0 W'
  ])('should be lost when instructions make it fall off Mars (%s)', (position: string) => {
    robot.setPosition(position);
    robot.processInstructions('F');
    expect(robot.getPosition()).toBe(`${position} LOST`);
  });

  it('should ignore further instructions after getting lost', () => {
    robot.setPosition('2 2 N');
    robot.processInstructions('FRRF');
    expect(robot.getPosition()).toBe('2 2 N LOST');
  });

  it('should ignore instruction to fall off Mars if another robot previously fell off at the same point', () => {
    robot.setPosition('2 2 N');
    robot.processInstructions('F');

    const robot2 = new OldRobot(mars, instructions);
    robot2.setPosition('2 2 N');
    robot2.processInstructions('F');

    expect(robot2.getPosition()).toBe('2 2 N');
  });
});

