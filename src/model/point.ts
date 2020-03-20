import { observable } from "mobx";

export class Point {
  @observable x: number;
  @observable y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  equals(point: Point) : boolean {
    return this.x === point.x && this.y === point.y;
  }
}