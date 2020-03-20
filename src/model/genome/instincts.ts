import { Cell } from "../cell";
import { action } from "mobx";
import { World } from "../world";
import { Point } from "../point";

export class InstinctRegistry {
  static directionsMovingMap = [
    'leftOne',
    'rightOne',
    'upOne',
    'downOne',
    'leftDownOne',
    'leftUpOne',
    'rightDownOne',
    'rightUpOne',
  ];

  @action static rightOne(cell: Cell, world: World): boolean {
    cell.spendEnergy(1);
    world.moveCell(cell, new Point(cell.position.x + 1, cell.position.y));

    return true;
  }

  @action static leftOne(cell: Cell, world: World): boolean {
    cell.spendEnergy(1);
    world.moveCell(cell, new Point(cell.position.x - 1, cell.position.y));

    return true;
  }

  @action static upOne(cell: Cell, world: World): boolean {
    cell.spendEnergy(1);
    world.moveCell(cell, new Point(cell.position.x, cell.position.y - 1));
    
    return true;
  }

  @action static downOne(cell: Cell, world: World): boolean {
    cell.spendEnergy(1);
    world.moveCell(cell, new Point(cell.position.x, cell.position.y + 1));

    return true;
  }

  @action static leftDownOne(cell: Cell, world: World): boolean {
    cell.spendEnergy(1);
    world.moveCell(cell, new Point(cell.position.x - 1, cell.position.y + 1));
    
    return true;
  }

  @action static rightDownOne(cell: Cell, world: World): boolean {
    cell.spendEnergy(1);
    world.moveCell(cell, new Point(cell.position.x + 1, cell.position.y + 1));
    
    return true;
  }

  @action static leftUpOne(cell: Cell, world: World): boolean {
    cell.spendEnergy(1);
    world.moveCell(cell, new Point(cell.position.x - 1, cell.position.y - 1));
    
    return true;
  }

  @action static rightUpOne(cell: Cell, world: World): boolean {
    cell.spendEnergy(1);
    world.moveCell(cell, new Point(cell.position.x + 1, cell.position.y - 1));
    
    return true;
  }

  @action static split(cell: Cell, world: World): boolean {
    if (cell.energy <= cell.genome.startEnergy + 100) {
      return false;
    } 

    cell.spendEnergy(cell.genome.startEnergy);

    const genome = cell.genome;

    const child = new Cell(World.lastCellId++, cell.position, genome);
    world.cells.push(child);

    return false;
  }
}
