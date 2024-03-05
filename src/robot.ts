import {Orientation, Position} from './position';
import {Mars} from './mars';

export class Robot {
  private position: Position;
  private isLost: boolean = false;

  constructor(private mars: Mars) {
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

  public processInstructions(instructions: string) {
    if (instructions.length >= 100) {
      throw new Error('Invalid instruction length. Instruction strings must be less than 100 characters.');
    }

    for (const instruction of instructions) {
      if (this.isLost) {
        // Silently ignore further instructions if lost
        return;
      }

      if (instruction === 'R') {
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
      } else if (instruction === 'L') {
        switch (this.position.orientation) {
        case 'N':
          this.position.orientation = 'W';
          break;
        case 'E':
          this.position.orientation = 'N';
          break;
        case 'S':
          this.position.orientation = 'E';
          break;
        case 'W':
          this.position.orientation = 'S';
          break;
        }
      } else if (instruction === 'F') {

        let newPosition = {
          ...this.position
        };

        switch (this.position.orientation) {
        case 'N':
          newPosition = {
            ...this.position,
            y: this.position.y + 1
          };
          break;

        case 'E':
          newPosition = {
            ...this.position,
            x: this.position.x + 1
          };
          break;
        case 'S':
          newPosition = {
            ...this.position,
            y: this.position.y - 1
          };
          break;
        case 'W':
          newPosition = {
            ...this.position,
            x: this.position.x - 1
          };
          break;
        }

        if (this.mars.isOutOfBounds(newPosition)){
          this.isLost = true;
        } else {
          this.position = newPosition;
        }
      } else {
        throw new Error('Instruction string contains unsupported instruction.');
      }
    }
  }
}
