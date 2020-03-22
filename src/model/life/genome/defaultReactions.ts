import { ReactionsRegistry } from "./reactions";
import { World } from "../../world";
import { AliveCell } from "../cells/aliveCell";

export class DefaultReactions {
  onObstacle: (cell: AliveCell, world: World) => boolean = ReactionsRegistry.obstacleMoveRandom.bind(this);
  onFoodFound = () => {};
}