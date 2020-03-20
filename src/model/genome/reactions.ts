import { Cell } from "../cell";
import { World } from "../world";
import { getRandomFreePointAround } from "./instincts";

export class ReactionsRegistry {
  static obstacleMoveRandom(cell: Cell, world: World) : boolean {
    console.log('omg, its busy here, i ll turn away')
    cell.position = getRandomFreePointAround(cell.position, world);
    return true;
  }
}