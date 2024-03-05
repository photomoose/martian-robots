import {Orientation, Position} from './position';
import {Mars} from './mars';
import {Instruction} from './instructions';

export class Robot {
  private position: Position;
  private isLost: boolean = false;

  constructor(private mars: Mars, private instructions: readonly Instruction[]) {
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
