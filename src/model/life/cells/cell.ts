import { Point } from "../../point";
import { observable } from "mobx";

export type CellType = 'alive' | 'food';

export abstract class AbstractCell {
  id: number;

  type: CellType;

  @observable position: Point;

  constructor(id: number, type: CellType, position: Point) {
    this.id = id;
    this.type = type;
    this.position = position;
  }
}
