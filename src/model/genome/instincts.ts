import { Cell } from "../cell";
import { action } from "mobx";

export class InstinctRegistry {
    @action static rightOne(cell: Cell) : boolean {
        cell.x++;
        return true;
    }

    @action static leftOne(cell: Cell) : boolean {
        cell.x--;
        return true;
    }

    @action static upOne(cell: Cell) : boolean {
        cell.y++;
        return true;
    }
};