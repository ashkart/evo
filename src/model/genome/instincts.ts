import { Cell } from "../cell";
import { World } from "../world";
import { Point } from "../point";

export type Instinct = (cell: Cell, world: World) => boolean;

export const InstinctRegistry: Record<string, Instinct> = {
  rightOne: (cell: Cell, world: World): boolean => {
    cell.spendEnergy(1);
    world.moveCell(cell, new Point(cell.position.x + 1, cell.position.y));

    return true;
  },

  leftOne: (cell: Cell, world: World): boolean => {
    cell.spendEnergy(1);
    world.moveCell(cell, new Point(cell.position.x - 1, cell.position.y));

    return true;
  },

  upOne: (cell: Cell, world: World): boolean => {
    cell.spendEnergy(1);
    world.moveCell(cell, new Point(cell.position.x, cell.position.y - 1));
    
    return true;
  },

  downOne: (cell: Cell, world: World): boolean => {
    cell.spendEnergy(1);
    world.moveCell(cell, new Point(cell.position.x, cell.position.y + 1));

    return true;
  },

  leftDownOne: (cell: Cell, world: World): boolean => {
    cell.spendEnergy(1);
    world.moveCell(cell, new Point(cell.position.x - 1, cell.position.y + 1));
    
    return true;
  },

  rightDownOne: (cell: Cell, world: World): boolean => {
    cell.spendEnergy(1);
    world.moveCell(cell, new Point(cell.position.x + 1, cell.position.y + 1));
    
    return true;
  },

  leftUpOne: (cell: Cell, world: World): boolean => {
    cell.spendEnergy(1);
    world.moveCell(cell, new Point(cell.position.x - 1, cell.position.y - 1));
    
    return true;
  },

  rightUpOne: (cell: Cell, world: World): boolean => {
    cell.spendEnergy(1);
    world.moveCell(cell, new Point(cell.position.x + 1, cell.position.y - 1));
    
    return true;
  },

  split: (cell: Cell, world: World): boolean => {
    const halfEnergy = Math.floor(cell.energy / 2);

    if (cell.energy <= cell.genome.startEnergy * 2) {
      return false;
    }

    cell.spendEnergy(halfEnergy);

    const genome = cell.genome;

    const child = new Cell(World.lastCellId++, cell.position, genome);
    child.energy = halfEnergy;

    world.cells.push(child);

    return false;
  }
}
