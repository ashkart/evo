import { observable } from "mobx";
import { DefaultReactions } from "./genome/defaultReactions";
import { Instinct } from "./genome/instincts";

export class Genome {
    // abilities
    maxAge: number;
    startEnergy: number;
    maxEnergy: number;

    @observable instincts: Instinct[];

    @observable reactions: DefaultReactions;

    constructor(
        maxAge = 100,
        startEnergy = 100,
        maxEnergy = startEnergy * 2,
        instincts: Instinct[] = [],
        reactions = new DefaultReactions()
    ) {
        this.maxAge = maxAge;
        this.startEnergy = startEnergy;
        this.maxEnergy = maxEnergy;
        this.instincts = instincts;
        this.reactions = reactions;
    }

    clone() {
        const instincts: Instinct[] = [];

        for (const ins of this.instincts) {
            instincts.push(ins);
        }

        const reacts = new DefaultReactions();
        const nextGenome = new Genome(this.maxAge, this.startEnergy, this.maxEnergy, instincts, reacts);

        return nextGenome;
    }
}