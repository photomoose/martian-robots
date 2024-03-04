export class Robot {
  private position: string;

  constructor() {
    this.position = '0 0 N';
  }

  public getPosition() {
    return this.position;
  }

  public setPosition(position: string) {
    const parts = position.match(/^(\d+)\s(\d+)\s([NESW]+)$/);

    if (parts?.length !== 4) {
      throw new Error('Invalid position format.');
    }

    const x = Number(parts[1]);
    const y = Number(parts[2]);
    const orientation = parts[3];

    if (x > 50 || y > 50) {
      throw new Error('Invalid position format.');
    }

    this.position = position;
  }

  public handleInstruction(instruction: string) {}
}
