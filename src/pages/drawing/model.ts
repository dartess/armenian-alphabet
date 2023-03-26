export interface Point {
  x: number;
  y: number;
}

export type Shape = Array<Point>;

export interface Lines {
  capLine: number;
  lowercaseLine: number;
  baseLine: number;
  descenderLine: number;
}
