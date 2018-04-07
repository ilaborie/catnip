import { Frame } from "../Frame";
import { Instruction, InstructionBuilder, Type } from "../input";

// invokestatic, invokevirtual, invokespecial, invokedynamic

export const objectsInstructions: InstructionBuilder = {};

objectsInstructions.getstatic = (args: any[]) => ({
    code: "getstatic",
    apply: (frame: Frame) => {
        const value = args[0];
        frame.stack.push({ type: Type.Constant, value });
    },
});

objectsInstructions.invokestatic = (args: any[]) => ({
    code: "invokestatic",
    apply: (frame: Frame) => {
        const value = args[0];
        frame.callStaticMethod(value);
    },
});

objectsInstructions.invokevirtual = (args: any[]) => ({
    code: "invokevirtual",
    apply: (frame: Frame) => {
        const value = args[0];
        frame.callObjectMethod(value);
    },
});
