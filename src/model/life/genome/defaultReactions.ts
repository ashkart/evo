import { ReactionsRegistry } from "./reactions";
import { World } from "../../world";
import { AliveCell } from "../cells/aliveCell";
import { Food } from "../cells/food";

export class DefaultReactions {
  onObstacle: (cell: AliveCell, world: World) => boolean = ReactionsRegistry.obstacleMoveRandom.bind(this);
  onFoodFound: (cell: AliveCell, food: Food) => boolean = ReactionsRegistry.foodConsume.bind(this);
}