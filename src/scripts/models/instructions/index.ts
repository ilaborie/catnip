import {Instruction} from "../input";
import {flowInstructions} from "./flow";
import {mathInstructions} from "./math";
import {objectsInstructions} from "./objects";
import {otherInstructions} from "./others";
import {stackInstructions} from "./stacks";

const allInstructions = {
    ...stackInstructions,
    ...objectsInstructions,
    ...mathInstructions,
    ...flowInstructions,
    ...otherInstructions,
};

export const lookupInstruction = (opscode: string): Instruction => {
    const i = allInstructions[opscode];
    if (i) {
        return i;
    }

    throw new Error(`Opscode ${opscode} not found !`);
};
