import {Position} from '../position';
import {Instruction} from './instruction';

export class Right implements Instruction {
  symbol = 'R';

  getNextPosition(position: Position): Position {
    switch (position.orientation) {
    case 'N':
      return {
        ...position,
        orientation: 'E'
      };
    case 'E':
      return {
        ...position,
        orientation: 'S'
      };
    case 'S':
      return {
        ...position,
        orientation: 'W'
      };
    case 'W':
      return {
        ...position,
        orientation: 'N'
      };
    }
  }
}
