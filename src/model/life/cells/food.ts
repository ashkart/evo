import { Point } from "../../point";
import { AbstractCell } from "./cell";

export class Food extends AbstractCell {
  energy: number = 50;

  constructor(id: number, position: Point) {
    super(id, 'food', position);
  }
}