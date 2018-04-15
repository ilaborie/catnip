import { Instruction, InstructionBuilder } from "../input";
import { flowInstructions } from "./flow";
import { mathInstructions } from "./math";
import { objectsInstructions } from "./objects";
import { otherInstructions } from "./others";
import { stackInstructions } from "./stacks";

const allInstructions: InstructionBuilder = {
  ...stackInstructions,
  ...objectsInstructions,
  ...mathInstructions,
  ...flowInstructions,
  ...otherInstructions
};

console.log(`Got ${Object.keys(allInstructions).length} instructions`);

export const lookupInstruction = (
  opscode: string,
  args: any[]
): Instruction => {
  const i = allInstructions[opscode];
  if (i) {
    return i(args);
  }

  throw new Error(`Opscode ${opscode} not found !`);
};
