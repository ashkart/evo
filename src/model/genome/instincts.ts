import { Cell } from "../cell";
import { World } from "../world";
import { Point } from "../point";
import { getRandomFreePointAround } from "../helpers";

export class InstinctRegistry {
  static rightOne(cell: Cell, world: World): boolean {
    cell.spendEnergy(1);
    world.moveCell(cell, new Point(cell.position.x + 1, cell.position.y));

    return true;
  }

  static leftOne(cell: Cell, world: World): boolean {
    cell.spendEnergy(1);
    world.moveCell(cell, new Point(cell.position.x - 1, cell.position.y));

    return true;
  }

  static upOne(cell: Cell, world: World): boolean {
    cell.spendEnergy(1);
    world.moveCell(cell, new Point(cell.position.x, cell.position.y - 1));
    
    return true;
  }

  static downOne(cell: Cell, world: World): boolean {
    cell.spendEnergy(1);
    world.moveCell(cell, new Point(cell.position.x, cell.position.y + 1));

    return true;
  }

  static leftDownOne(cell: Cell, world: World): boolean {
    cell.spendEnergy(1);
    world.moveCell(cell, new Point(cell.position.x - 1, cell.position.y + 1));
    
    return true;
  }

  static rightDownOne(cell: Cell, world: World): boolean {
    cell.spendEnergy(1);
    world.moveCell(cell, new Point(cell.position.x + 1, cell.position.y + 1));
    
    return true;
  }

  static leftUpOne(cell: Cell, world: World): boolean {
    cell.spendEnergy(1);
    world.moveCell(cell, new Point(cell.position.x - 1, cell.position.y - 1));
    
    return true;
  }

  static rightUpOne(cell: Cell, world: World): boolean {
    cell.spendEnergy(1);
    world.moveCell(cell, new Point(cell.position.x + 1, cell.position.y - 1));
    
    return true;
  }

  static split(cell: Cell, world: World): boolean {
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
