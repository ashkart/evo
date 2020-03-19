import { Cell } from "./cell";
import { observable, action } from "mobx";

export class World {
  updateInterval: NodeJS.Timeout | null = null;

  @observable cells: Cell[] = [];

  xSize: number = 10;
  ySize: number = 10;

  @action tick = () => {
    this.cells.forEach(cell => {
      cell.energy--;

      cell.act();

      // замкнутый мир
      cell.x = cell.x > 0 ? Math.max(this.xSize - cell.x, 0) : this.xSize;
      cell.y = cell.y > 0 ? Math.max(this.ySize - cell.y, 0) : this.ySize;
    });
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
