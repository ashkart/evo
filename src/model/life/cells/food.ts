import { Point } from "../../point";

export class Food {
  energy: number = 10;

  position: Point;

  constructor(position: Point) {
    this.position = position;
  }
}