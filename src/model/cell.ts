import { Genome } from "./genome";
import { observable, action } from "mobx";
import { Point } from "./point";
import { World } from "./world";
import { InstinctRegistry } from "./genome/instincts";

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
      const iResult = this.genome.instincts[instinctName](this, world);

      if (iResult === true) {
        break;
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
