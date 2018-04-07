import { Frame } from "../Frame";
import { Instruction, InstructionBuilder, Type } from "../input";

// return, ireturn

export const flowInstructions: InstructionBuilder = {};

interface Comparators {
    [index: string]: (a: number, b: number) => boolean;
}

const comparators: Comparators = {
    ge: (a: number, b: number): boolean => a >= b,
    gt: (a: number, b: number): boolean => a > b,
    le: (a: number, b: number): boolean => a <= b,
    lt: (a: number, b: number): boolean => a < b,
    ne: (a: number, b: number): boolean => a !== b,
};

const intIfCmp = (jump: number, cmp: keyof Comparators): Instruction => ({
    type: Type.Int,
    code: `if_icmp${cmp}`,
    apply: (frame: Frame) => {
        const b = frame.stack.pop().value as number;
        const a = frame.stack.pop().value as number;
        const needJump = comparators[cmp](a, b);
        frame.next(needJump ? jump : undefined);
    },
});

const gotoLabel = (jump: number): Instruction => ({
    code: `goto`,
    apply: (frame: Frame) => {
        frame.next(jump);
    },
});

flowInstructions.if_icmpgt = (args: any[]) => {
    const jump = parseInt(args[0], 10);
    return intIfCmp(jump, "gt");
};

flowInstructions.goto = (args: any[]) => {
    const jump = parseInt(args[0], 10);
    return gotoLabel(jump);
};

flowInstructions.ireturn = () => ({
    code: `ireturn`,
    apply: (frame: Frame) => {
        const value = frame.stack.pop();
        frame.return(value);
    },
});

flowInstructions.return = () => ({
    code: `return`,
    apply: (frame: Frame) => frame.return(),
});
