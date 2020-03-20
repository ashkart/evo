import { observable } from "mobx";
import { DefaultReactions } from "./genome/defaultReactions";

export class Genome {
    // abilities
    maxAge: number;
    startEnergy: number;
    maxEnergy: number;

    @observable instincts: Function[];

    @observable reactions: DefaultReactions;

    constructor(
        maxAge = 100,
        startEnergy = 100,
        maxEnergy = 200,
        instincts = [],
        reactions = new DefaultReactions()
    ) {
        this.maxAge = maxAge;
        this.startEnergy = startEnergy;
        this.maxEnergy = maxEnergy;
        this.instincts = instincts;
        this.reactions = reactions;
    }
}