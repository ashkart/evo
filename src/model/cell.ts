import { Genome } from "./genome";

export class Cell {
    x: number;
    y: number;
    energy: number;
    genome: Genome;

    constructor(x: number, y: number, genome: Genome) {
        this.x = x;
        this.y = y;
        this.genome = genome;
        this.energy = genome.startEnergy;
    }

    public act(): void {
        for (const instinctName in this.genome.instincts) {
            if (this.genome.instincts[instinctName]() === true) {
                break;
            }
        }
    }
}