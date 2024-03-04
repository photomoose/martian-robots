export class Mars {

  private constructor(private x: number, private y: number) {}

  public static create(x: number, y: number) {
    if (x > 50 || y > 50) {
      throw new Error('Invalid coordinates. Valid coordinates range from 1 to 50.');
    }

    return new Mars(x, y);
  }
}
