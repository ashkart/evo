import { Genome } from "./genome";
import { observable, action } from "mobx";
import { Point } from "./point";
import { World } from "./world";

export class Cell {
  id: number;

  isAlive: boolean = true;

  @observable position: Point;
  @observable energy: number;
  @observable genome: Genome;

  constructor(id: number, position: Point, genome: Genome) {
    this.id = id;
    this.position = position;
    this.genome = genome;
    this.energy = genome.startEnergy;
  }

  @action act(world: World): void {
    for (const instinctName in this.genome.instincts) {
      const iResult = this.genome.instincts[instinctName](this);
      if (iResult === true) {
        break;
      }

      if (iResult instanceof Cell) {
        if (instinctName === 'split') {
          world.moveCell(this, this.position);
          world.cells.push(iResult);
        }
      }
    }
  }

  @action spendEnergy(value: number) {
    this.energy -= value;

    if (this.energy <= 0) {
      this.die();
    }
  }

  @action die() {
    this.isAlive = false;
  }
}
