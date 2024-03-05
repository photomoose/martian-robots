import {Position} from '../position';

export interface Instruction {
  symbol: string;
  getNextPosition(position: Position): Position;
}

