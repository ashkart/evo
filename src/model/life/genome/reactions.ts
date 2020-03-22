import { AliveCell } from "../cells/aliveCell";
import { World } from "../../world";
import { getRandomFreePointAround } from "../../helpers";
import { Food } from "../cells/food";

export const ReactionsRegistry = {
  obstacleMoveRandom: (cell: AliveCell, world: World) : boolean => {
    cell.position = getRandomFreePointAround(cell.position, world);
    
    return true;
  },

  foodConsume: (cell: AliveCell, food: Food) : boolean => {
    cell.consumeFood(food);
    cell.position = food.position;

    return true;
  } 
}