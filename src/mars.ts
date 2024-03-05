import { Coordinate } from './coordinate';

export class Mars {

  private scents: readonly Coordinate[] = [];
  private constructor(private upperRight: Coordinate) {}

  public static create(upperRightString: string): Mars {
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

    return new Mars(upperRight);
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
