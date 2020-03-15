import { Cell } from "./cell";

export class World {
    cells: Cell[] = [];

    xSize: number = 10;
    ySize: number = 10;

    tick = () => {
        this.cells.forEach(cell => {
            cell.energy--;

            cell.act();

            // замкнутый мир
            cell.x = cell.x > 0 ? Math.max(this.xSize - cell.x, 0) : this.xSize;
            cell.y = cell.y > 0 ? Math.max(this.ySize - cell.y, 0) : this.ySize;
        });
    }
}