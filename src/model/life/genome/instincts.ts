import { AliveCell } from "../cells/aliveCell";
import { World } from "../../world";
import { Point } from "../../point";
import { getPointsAround } from "../../helpers";
import { Genome } from "../genome";

export type Instinct = (cell: AliveCell, world: World) => boolean;

export const InstinctRegistry: Record<string, Instinct> = {
  rightOne: (cell: AliveCell, world: World): boolean => {
    cell.spendEnergy(1);
    world.moveCell(cell, new Point(cell.position.x + 1, cell.position.y));

    return true;
  },

  leftOne: (cell: AliveCell, world: World): boolean => {
    cell.spendEnergy(1);
    world.moveCell(cell, new Point(cell.position.x - 1, cell.position.y));

    return true;
  },

  upOne: (cell: AliveCell, world: World): boolean => {
    cell.spendEnergy(1);
    world.moveCell(cell, new Point(cell.position.x, cell.position.y - 1));
    
    return true;
  },

  downOne: (cell: AliveCell, world: World): boolean => {
    cell.spendEnergy(1);
    world.moveCell(cell, new Point(cell.position.x, cell.position.y + 1));

    return true;
  },

  leftDownOne: (cell: AliveCell, world: World): boolean => {
    cell.spendEnergy(1);
    world.moveCell(cell, new Point(cell.position.x - 1, cell.position.y + 1));
    
    return true;
  },

  rightDownOne: (cell: AliveCell, world: World): boolean => {
    cell.spendEnergy(1);
    world.moveCell(cell, new Point(cell.position.x + 1, cell.position.y + 1));
    
    return true;
  },

  leftUpOne: (cell: AliveCell, world: World): boolean => {
    cell.spendEnergy(1);
    world.moveCell(cell, new Point(cell.position.x - 1, cell.position.y - 1));
    
    return true;
  },

  rightUpOne: (cell: AliveCell, world: World): boolean => {
    cell.spendEnergy(1);
    world.moveCell(cell, new Point(cell.position.x + 1, cell.position.y - 1));
    
    return true;
  },

  actForInterest: (cell: AliveCell, world: World): boolean => {
    const pointsAround = getPointsAround()(cell.position);

    for (const point of pointsAround) {
      const food = world.food.find(f => f.position.equals(point));

      if (food) {
        const consumedResult = cell.genome.reactions.onFoodFound(cell, food);

        if (typeof consumedResult === 'boolean') {
          return consumedResult;
        }
      }
    }

    return false;
  },

  split: (cell: AliveCell, world: World): boolean => {
    if (cell.energy <= cell.genome.startEnergy * 1.5) {
      return false;
    }

    cell.spendEnergy(cell.genome.startEnergy);

    const genome = cell.genome.clone();
    const child = new AliveCell(world, ++World.lastCellId, cell.position, genome, cell.generation + 1);
    child.energy = cell.genome.startEnergy;

    world.cells.push(child);

    return false;
  }
}
