export class Mars {

  private constructor(private upperRight: Coordinate) {}

  public static create(upperRight: Coordinate) {
    if (upperRight.x < 1 || upperRight.x > 50 || upperRight.y < 1 || upperRight.y > 50) {
      throw new Error('Invalid upper-right coordinates. Valid coordinates range from 1 to 50.');
    }

    return new Mars(upperRight);
  }

  public isOutOfBounds(coordinate: Coordinate) {
    return coordinate.x < 0 || coordinate.x > this.upperRight.x || coordinate.y < 0 || coordinate.y > this.upperRight.y;
  }
}
