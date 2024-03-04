export class Robot {
  private position: string;

  constructor() {
    this.position = '0 0 N';
  }

  public getPosition() {
    return this.position;
  }

  public setPosition(position: string) {
    const parts = position.split(' ');

    if (parts.length !== 3) {
      throw new Error('Invalid position format.');
    }

    this.position = position;
  }
}
