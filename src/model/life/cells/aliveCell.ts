import { Genome } from "../genome";
import { observable } from "mobx";
import { Point } from "../../point";
import { World } from "../../world";
import { AbstractCell } from "./cell";
import { Food } from "./food";
import { getRandomMoveInstinct } from "../../helpers";

export class AliveCell extends AbstractCell {
  @observable isAlive: boolean = true;

  world: World;

  @observable energy: number;
  @observable genome: Genome;

  generation: number = 0;
  mutationPeriod: number = 2;

  constructor(world: World, id: number, position: Point, genome: Genome, generation: number = 0) {
    super(id, 'alive', position);
    this.world = world;

    this.genome = genome;

    this.energy = genome.startEnergy;
    this.generation = generation;

    if (this.generation % this.mutationPeriod === 0) {
      this.mutateGenome();
    }
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

  consumeFood(food: Food) {
    this.energy += food.energy;

    this.world.removeFood(food);
  }

  mutateGenome() {
    this.genome.instincts[this.genome.instincts.length - 1] = getRandomMoveInstinct();
  }

  die() {
    this.isAlive = false;
  }
}
