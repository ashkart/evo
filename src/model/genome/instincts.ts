import { Cell } from "../cell";
import { action } from "mobx";
import { World } from "../world";

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

  @action static rightOne(cell: Cell): boolean {
    cell.spendEnergy(1);

    cell.position.x++;
    return false;
  }

  @action static leftOne(cell: Cell): boolean {
    cell.spendEnergy(1);

    cell.position.x--;
    return false;
  }

  @action static upOne(cell: Cell): boolean {
    cell.spendEnergy(1);

    cell.position.y--;
    return false;
  }

  @action static downOne(cell: Cell): boolean {
    cell.spendEnergy(1);

    cell.position.y++;
    return false;
  }

  @action static leftDownOne(cell: Cell): boolean {
    cell.spendEnergy(1);

    cell.position.y++;
    cell.position.x--;
    return false;
  }

  @action static rightDownOne(cell: Cell): boolean {
    cell.spendEnergy(1);

    cell.position.y++;
    cell.position.x++;
    return false;
  }

  @action static leftUpOne(cell: Cell): boolean {
    cell.spendEnergy(1);

    cell.position.y--;
    cell.position.x--;
    return false;
  }

  @action static rightUpOne(cell: Cell): boolean {
    cell.spendEnergy(1);

    cell.position.y--;
    cell.position.x++;
    return false;
  }

  @action static split(cell: Cell): Cell | null {
    if (cell.energy <= cell.genome.startEnergy + 100) {
      return null;
    } 

    cell.spendEnergy(cell.genome.startEnergy);

    const genome = cell.genome;

    const child = new Cell(World.lastCellId++, cell.position, genome);

    return child;
  }
}
