import { Genome } from "./genome";
import { observable, action } from "mobx";

export class Cell {
    id: number;

    @observable x: number;
    @observable y: number;
    @observable energy: number;
    @observable genome: Genome;

    constructor(id: number, x: number, y: number, genome: Genome) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.genome = genome;
        this.energy = genome.startEnergy;
    }

    @action act(): void {
        for (const instinctName in this.genome.instincts) {
            if (this.genome.instincts[instinctName](this) === true) {
                break;
            }
        }
    }
}