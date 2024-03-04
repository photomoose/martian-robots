import {Orientation, Position} from './position';

export class Robot {
  private position: Position;

  constructor() {
    this.position = {
      x: 0,
      y: 0,
      orientation: 'N'
    };
  }

  public getPosition() {
    return `${this.position.x} ${this.position.y} ${this.position.orientation}`;
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

  public handleInstruction(instruction: string) {
    switch (this.position.orientation) {
    case 'N':
      this.position.orientation = 'E';
      break;
    case 'E':
      this.position.orientation = 'S';
      break;
    case 'S':
      this.position.orientation = 'W';
      break;
    case 'W':
      this.position.orientation = 'N';
      break;
    }
  }
}
