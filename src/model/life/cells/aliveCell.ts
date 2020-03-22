import { Genome } from "../genome";
import { observable } from "mobx";
import { Point } from "../../point";
import { World } from "../../world";

export class AliveCell {
  id: number;

  isAlive: boolean = true;

  world: World;

  @observable position: Point;
  @observable energy: number;
  @observable genome: Genome;

  constructor(world: World,id: number, position: Point, genome: Genome) {
    this.world = world;

    this.id = id;
    this.position = position;
    this.genome = genome;

    this.energy = genome.startEnergy;
  }

  act(): void {
    for (const instinctName in this.genome.instincts) {
      const iResult = this.genome.instincts[instinctName](this, this.world);

      if (iResult === true) {
        break;
      }
    }
  }

  spendEnergy(value: number) {
    this.energy -= value;

    if (this.energy <= 0) {
      this.die();
    }
  }

  die() {
    this.isAlive = false;
  }
}
