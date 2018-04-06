import { Instruction } from "../input";

// if_icmpgt,  goto, return, ireturn

export const flowInstructions: { [index: string]: () => Instruction } = {};
