import {Orientation, Position} from './position';
import {OldMars} from './oldMars';
import {Instruction} from './instructions';
import {Effect, Match, pipe, ReadonlyRecord, Option, ReadonlyArray, Console} from 'effect';

export interface Robot {
  position: Position;
}

export const createRobot = (): Robot => ({
  position: {
    x: 0,
    y: 0,
    orientation: 'N'
  }
});

export const getPosition = (robot: Robot) => Effect.succeed(`${robot.position.x} ${robot.position.y} ${robot.position.orientation}`);

export const setPosition = (position: string) : Effect.Effect<Robot, Error> => pipe(
  Effect.succeed(position.match(/^(\d+)\s(\d+)\s([NESW]+)$/)),
  Effect.flatMap((parts) => parts?.length !== 4 ? Effect.fail(new Error('Invalid position format.')) : Effect.succeed({
    x: Number(parts[1]),
    y: Number(parts[2]),
    orientation: parts[3] as Orientation
  })),
  Effect.flatMap((p) => (p.x > 50 || p.y > 50) ? Effect.fail(new Error('Invalid position format.')) : Effect.succeed({
    position: p
  }))
);

const rotateRight = (position: Position) => pipe(
  position.orientation,
  Match.value<Orientation>,
  Match.when(Match.is('N'), (): Position => ({...position, orientation: 'E' as Orientation})),
  Match.when(Match.is('E'), (): Position => ({...position, orientation: 'S' as Orientation})),
  Match.when(Match.is('S'), (): Position => ({...position, orientation: 'W' as Orientation})),
  Match.when(Match.is('W'), (): Position => ({...position, orientation: 'N' as Orientation})),
  Match.exhaustive
);

const rotateLeft = (position: Position) => pipe(
  position.orientation,
  Match.value,
  Match.when(Match.is('N'), (): Position => ({...position, orientation: 'W'})),
  Match.when(Match.is('E'), (): Position => ({...position, orientation: 'N'})),
  Match.when(Match.is('S'), (): Position => ({...position, orientation: 'E'})),
  Match.when(Match.is('W'), (): Position => ({...position, orientation: 'S'})),
  Match.exhaustive
);

const moveForward = (position: Position) => pipe(
  position.orientation,
  Match.value,
  Match.when(Match.is('N'), (): Position => ({...position, y: position.y + 1})),
  Match.when(Match.is('E'), (): Position => ({...position, x: position.x + 1})),
  Match.when(Match.is('S'), (): Position => ({...position, y: position.y - 1})),
  Match.when(Match.is('W'), (): Position => ({...position, x: position.x - 1})),
  Match.exhaustive
);

const instructions: Record<string, (position: Position) => Position> = {
  'R': rotateRight,
  'L': rotateLeft,
  'F': moveForward
};

export const processInstructions = (instructions: string) => (robot: Robot): Effect.Effect<Robot, Error> =>
  pipe(
    instructions,
    Effect.reduce(robot, (r: Robot, i: string) =>
      pipe(
        r,
        processInstruction(i)
      )
    )
  );

export const processInstruction = (instruction: string) => (robot: Robot): Effect.Effect<Robot, Error> => pipe(
  instructions,
  ReadonlyRecord.get(instruction),
  Option.match({
    onNone: () => Effect.fail(new Error('Instruction string contains unsupported instruction.')),
    onSome: (i) => Effect.succeed(i(robot.position))
  }),
  Effect.flatMap((p: Position) => Effect.succeed({
    position: p
  }))
);

export class OldRobot {
  private position: Position;
  private isLost: boolean = false;

  constructor(private mars: OldMars, private instructions: readonly Instruction[]) {
    this.position = {
      x: 0,
      y: 0,
      orientation: 'N'
    };
  }


  public getPosition() {
    return `${this.position.x} ${this.position.y} ${this.position.orientation}${this.isLost ? ' LOST' : ''}`;
  }

  public setPosition(position: string) {
    const parts = position.match(/^(\d+)\s(\d+)\s([NESW]+)$/);

    if (parts?.length !== 4) {
      throw new Error('Invalid position format.');
    }

    const x = Number(parts[1]);
    const y = Number(parts[2]);
    const orientation = parts[3] as Orientation;

    if (x > 50 || y > 50) {
      throw new Error('Invalid position format.');
    }

    this.position = {
      x,
      y,
      orientation
    };
  }

  public processInstructions(instructionString: string) {
    if (instructionString.length >= 100) {
      throw new Error('Invalid instruction length. Instruction strings must be less than 100 characters.');
    }

    for (const instruction of instructionString) {
      this.processSingleInstruction(instruction);
    }
  }

  private processSingleInstruction(instructionString: string) {
    if (this.isLost) {
      // Silently ignore further instructions if lost
      return;
    }

    const instruction = this.instructions.find((i) => i.symbol === instructionString);

    if (instruction) {
      const newPosition = instruction.getNextPosition(this.position);

      if (this.mars.isOutOfBounds(newPosition)) {
        if (!this.mars.hasScent(this.position)) {
          this.isLost = true;
          this.mars.leaveScent(this.position);
        }
      } else {
        this.position = newPosition;
      }
    } else {
      throw new Error('Instruction string contains unsupported instruction.');
    }
  }
}
