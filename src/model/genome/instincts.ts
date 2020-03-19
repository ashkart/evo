import { Cell } from "../cell";

export type Instincts = Record<string, (cell: Cell) => boolean>;

export const allInstincts: Instincts = {
    rightOne: (cell: Cell) : boolean => {
        cell.x++;
        return true;
    },

    leftOne: () : boolean => {
        return true;
    }
};