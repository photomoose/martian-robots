import {Position} from '../position';
import {Instruction} from './instruction';

export class Forward implements Instruction {
  symbol = 'F';

  getNextPosition(position: Position): Position {
    switch (position.orientation) {
    case 'N':
      return {
        ...position,
        y: position.y + 1
      };
    case 'E':
      return {
        ...position,
        x: position.x + 1
      };
    case 'S':
      return {
        ...position,
        y: position.y - 1
      };
    case 'W':
      return {
        ...position,
        x: position.x - 1
      };
    }
  }
}
