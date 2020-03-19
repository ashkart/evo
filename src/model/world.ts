import { Cell } from "./cell";
import { observable, action } from "mobx";
import { Point } from "./point";
import { InstinctRegistry } from "./genome/instincts";

export class World {
  static lastCellId: number = 0;

  updateInterval: NodeJS.Timeout | null = null;

  @observable cells: Cell[] = [];

  xSize: number = 10;
  ySize: number = 10;

  @action tick = () => {
    for (let i = 0; i < this.cells.length; i++) {
      const cell = this.cells[i];

      if (!cell.isAlive) {
        this.removeCell(i);
        continue;
      }

      cell.act(this);

      cell.position = this.worldLoopPosition(cell.position);
    }
  }

  @action removeCell(index: number) {
    this.cells.splice(index, 1);
  }

  @action moveCell(cell: Cell, newPos: Point) : boolean {
    if (!this.isEmptyPoint(newPos)) {
      cell.position = newPos;
      return true;
    }

    const newPosition = this.getRandomFreePointAround(cell.position);

    return this.moveCell(cell, newPosition);
  }

  @action worldLoopPosition(position: Point) : Point {
    // замкнутый мир
    const x = position.x >= this.xSize ? 0 : (position.x < 0 ? this.xSize - 1 : position.x);
    const y = position.y >= this.ySize ? 0 : (position.y < 0 ? this.ySize - 1 : position.y);

    return new Point(x, y);
  }

  isEmptyPoint(point: Point) : boolean {
    return this.cells.find(c => c.position.x === point.x && c.position.y === point.y) === undefined;
  }

  getRandomFreePointAround (position: Point) : Point {
    let point = this.newPointByDirectionCode(position, getRandomInt(InstinctRegistry.directionsMovingMap.length - 1));

    while (!this.isEmptyPoint(point)) {
      point = this.newPointByDirectionCode(position, getRandomInt(InstinctRegistry.directionsMovingMap.length - 1))
    }

    return point;
  }

  newPointByDirectionCode(position: Point, directionCode: number) : Point {
    let newX: number = position.x;
    let newY: number = position.y;
  
    switch (directionCode) {
      case 0:
        newX--;
        break;
  
      case 1:
        newX++;
        break;
  
      case 2: 
        newY--;
        break;
  
      case 3: 
        newY++;
        break;
  
      case 4:
        newX--;
        newY++;
        break;
  
      case 5:
        newX++;
        newY++;
        break;
      
      case 6:
        newX--;
        newY--;
        break;
    }
  
    return this.worldLoopPosition(new Point(newX, newY));
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

const getRandomInt = (max: number, min: number = 0) : number => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}
