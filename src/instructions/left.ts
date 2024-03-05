import {Position} from '../position';
import {Instruction} from './instruction';

export class Left implements Instruction {
  symbol = 'L';

  getNextPosition(position: Position): Position {
    switch (position.orientation) {
    case 'N':
      return {
        ...position,
        orientation: 'W'
      };
    case 'E':
      return {
        ...position,
        orientation: 'N'
      };
    case 'S':
      return {
        ...position,
        orientation: 'E'
      };
    case 'W':
      return {
        ...position,
        orientation: 'S'
      };
    }
  }
}
