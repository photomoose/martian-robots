export type Orientation = 'N' | 'E' | 'S' | 'W';

export interface Position {
  x: number;
  y: number;
  orientation: Orientation;
}
