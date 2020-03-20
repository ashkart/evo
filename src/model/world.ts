import { Cell } from "./cell";
import { observable, action } from "mobx";
import { Point } from "./point";
import { getRandomFreePointAround, InstinctRegistry } from "./genome/instincts";

export class World {
  static lastCellId: number = 0;

  updateInterval: NodeJS.Timeout | null = null;

  loopCache: Record<string, Point> = {};

  @observable cells: Cell[] = [];

  xSize: number = 10;
  ySize: number = 10;

  @action tick = () => {
    this.cells.forEach((cell, i) => {
      if (!cell.isAlive) {
        this.removeCell(i);
        return;
      }

      cell.act(this);
    });
  }

  @action removeCell(index: number) {
    this.cells.splice(index, 1);
  }

  @action moveCell(cell: Cell, newPos: Point) : boolean {
    newPos = this.worldLoopPosition(newPos);

    if (this.isEmptyPoint(newPos) || cell.position.equals(newPos)) {
      cell.position = newPos;
      return true;
    }

    cell.position = getRandomFreePointAround(cell.position, this);
    return true;
  }

  // замкнутый мир
  worldLoopPosition(position: Point) : Point {
    const key = `${position.x}_${position.y}`;

    if (this.loopCache[key] === undefined) {
      const x = position.x >= this.xSize ? 0 : (position.x < 0 ? this.xSize - 1 : position.x);
      const y = position.y >= this.ySize ? 0 : (position.y < 0 ? this.ySize - 1 : position.y);

      this.loopCache[key] = new Point(x, y);
    }

    return this.loopCache[key];
  }

  isEmptyPoint(point: Point) : boolean {
    return this.cells.find(c => c.position.x === point.x && c.position.y === point.y) === undefined;
  }

  start() {
    this.updateInterval = setInterval(() => {
      this.tick();
    }, 1000);
  }

  stop() {
    if (this.updateInterval !== null) {
      clearInterval(this.updateInterval);
    }
  }
}
