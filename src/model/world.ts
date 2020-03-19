import { Cell } from "./cell";
import { observable, action } from "mobx";

export class World {
  updateInterval: NodeJS.Timeout | null = null;

  @observable cells: Cell[] = [];

  xSize: number = 10;
  ySize: number = 10;

  @action tick = () => {
    for (const cell of this.cells) {
      cell.energy--;

      cell.act();

      // замкнутый мир
      cell.x = cell.x >= this.xSize ? 0 : (cell.x < 0 ? this.xSize - 1 : cell.x);
      cell.y = cell.y >= this.ySize ? 0 : (cell.y < 0 ? this.ySize - 1 : cell.y);
    }
  };

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
