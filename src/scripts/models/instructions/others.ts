import { Frame } from "../Frame";
import { Instruction, InstructionBuilder } from "../input";

//

export const otherInstructions: InstructionBuilder = {};

otherInstructions.nop = (args: any[]): Instruction => ({
  code: "nop",
  apply: (frame: Frame) => frame.next()
});
