import { Cell } from "../cell";
import { World } from "../world";
import { getRandomFreePointAround } from "../helpers";

export class ReactionsRegistry {
  static obstacleMoveRandom(cell: Cell, world: World) : boolean {
    cell.position = getRandomFreePointAround(cell.position, world);
    
    return true;
  }
}