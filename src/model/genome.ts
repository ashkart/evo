import { Cell } from "./cell";
import { Instincts } from "./genome/instincts";

export class Genome {
    // abilities
    maxAge: number;
    startEnergy: number;
    maxEnergy: number;

    instincts: Instincts;

    reactions: Function[];

    constructor(
        maxAge = 100,
        startEnergy = 100,
        maxEnergy = 200,
        instincts = {},
        reactions = []
    ) {
        this.maxAge = maxAge;
        this.startEnergy = startEnergy;
        this.maxEnergy = maxEnergy;
        this.instincts = instincts;
        this.reactions =  reactions;
    }
}