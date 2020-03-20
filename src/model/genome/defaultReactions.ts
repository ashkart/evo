import { ReactionsRegistry } from "./reactions";
import { World } from "../world";
import { Cell } from "../cell";

export class DefaultReactions {
  onObstacle: (cell: Cell, world: World) => boolean = ReactionsRegistry.obstacleMoveRandom.bind(this);
}