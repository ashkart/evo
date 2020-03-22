import { AliveCell } from "../cells/aliveCell";
import { World } from "../../world";
import { getRandomFreePointAround } from "../../helpers";
import { Point } from "../../point";

export const ReactionsRegistry = {
  obstacleMoveRandom: (cell: AliveCell, world: World) : boolean => {
    cell.position = getRandomFreePointAround(cell.position, world);
    
    return true;
  },

  foodConsume: (cell: AliveCell, foodPos: Point) => {} 
}