import { Coordinate } from './coordinate';
import { Effect, pipe} from 'effect';

export interface Mars {
  upperRight: Coordinate;
}
export class OldMars {

  private scents: readonly Coordinate[] = [];
  private constructor(private upperRight: Coordinate) {}

  public static create(upperRightString: string): OldMars {
    const parts = upperRightString.match(/^(\d+)\s(\d+)$/);

    if (parts?.length !== 3) {
      throw new Error('Invalid upper-right coordinates format.');
    }

    const upperRight = {
      x: Number(parts[1]),
      y: Number(parts[2])
    };

    if (upperRight.x < 1 || upperRight.x > 50 || upperRight.y < 1 || upperRight.y > 50) {
      throw new Error('Invalid upper-right coordinates. Valid coordinates range from 1 to 50.');
    }

    return new OldMars(upperRight);
  }

  public isOutOfBounds(coordinate: Coordinate): boolean {
    return coordinate.x < 0 || coordinate.x > this.upperRight.x || coordinate.y < 0 || coordinate.y > this.upperRight.y;
  }

  public leaveScent(coordinate: Coordinate) {
    this.scents = [...this.scents, coordinate];
  }

  public hasScent(coordinate: Coordinate): boolean {
    return this.scents.some((s) => s.x === coordinate.x && s.y === coordinate.y);
  }
}

export const createMars = (upperRight: string): Effect.Effect<Mars, Error> => pipe(
  Effect.succeed(upperRight.match(/^(\d+)\s(\d+)$/)),
  Effect.flatMap((parts) => parts?.length !== 3 ?
    Effect.fail(new Error('Invalid upper-right coordinates format.')) :
    Effect.succeed(parts)),
  Effect.map((parts) => ({
    x: Number(parts[1]),
    y: Number(parts[2])
  })),
  Effect.flatMap((c: Coordinate) => (c.x < 1 || c.x > 50 || c.y < 1 || c.y > 50) ?
    Effect.fail(new Error('Invalid upper-right coordinates. Valid coordinates range from 1 to 50.')) :
    Effect.succeed(c)),
  Effect.map((c) => ({
    upperRight: { x: c.x, y: c.y }
  }))
);

