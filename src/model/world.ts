import { AliveCell } from "./life/cells/aliveCell";
import { observable, action } from "mobx";
import { Point } from "./point";
import { Food } from "./life/cells/food";
import { getRandomInt } from "./helpers";

export class World {
  static lastCellId: number = 0;

  @observable simSpeed: number = 1;

  isStarted: boolean = false;

  loopCache: Record<string, Point> = {};

  @observable cells: AliveCell[] = [];

  @observable food: Food[] = [];

  maxFoodSpawn: number = 3;
  foodSpawnPeriod: number = 5;
  stepNumber: number = 0;

  xSize: number = 10;
  ySize: number = 10;

  @action tick = () => {
    this.stepNumber++;

    this.cells.forEach((cell, i) => {
      if (!cell.isAlive) {
        this.removeCell(i);
        return;
      }

      cell.act();
    });

    if (this.stepNumber % this.foodSpawnPeriod === 0) {
      this.spawnFood();
    }
  }

  spawnFood() {
    let spawnFoodCounter = this.maxFoodSpawn;

    while (spawnFoodCounter--) {
      const foodPoint = new Point(getRandomInt(this.xSize - 1), getRandomInt(this.ySize - 1));

      if (this.isEmptyPoint(foodPoint)) {
        this.food.push(new Food(++World.lastCellId, foodPoint));
      }
    }
  }

  removeCell(index: number) {
    this.cells.splice(index, 1);
  }

  removeFood(food: Food) {
    const idx = this.food.findIndex(f => food.position.equals(f.position));
    this.food.splice(idx, 1);
  }

  moveCell(cell: AliveCell, newPos: Point): boolean {
    newPos = this.worldLoopPosition(newPos);

    if (this.hasNoObstacle(newPos) || cell.position.equals(newPos)) {
      cell.position = newPos;
      return true;
    }

    return cell.genome.reactions.onObstacle(cell, this);
  }

  // замкнутый мир
  worldLoopPosition(position: Point): Point {
    const key = `${position.x}_${position.y}`;

    if (this.loopCache[key] === undefined) {
      const x = position.x >= this.xSize ? 0 : (position.x < 0 ? this.xSize - 1 : position.x);
      const y = position.y >= this.ySize ? 0 : (position.y < 0 ? this.ySize - 1 : position.y);

      this.loopCache[key] = new Point(x, y);
    }

    return this.loopCache[key];
  }

  hasNoObstacle(point: Point): boolean {
    return this.cells.find(c => c.position.x === point.x && c.position.y === point.y) === undefined;
  }

  isEmptyPoint(point: Point): boolean {
    return this.hasNoObstacle && this.food.find(c => c.position.x === point.x && c.position.y === point.y) === undefined;
  }

  start() {
    this.isStarted = true;

    const fn = () => {
      if (this.isStarted) {
        this.tick();
        setTimeout(fn, 1000 / this.simSpeed);
      }
    };

    fn();
  }

  stop() {
    this.isStarted = false;
  }
}
