import { Instruction } from "../input";

// getstatic
// invokestatic, invokevirtual, invokespecial, invokedynamic

export const objectsInstructions: { [index: string]: () => Instruction } = {};
