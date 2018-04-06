import { Frame } from "../Frame";
import { Instruction, InstructionBuilder, Type, typePrefix } from "../input";
import { TODO } from "../utils";

// imul, iinc

export const mathInstructions: InstructionBuilder = {};

const typedBinaryOperation = (type: Type, key: string, ope: (a: number, b: number) => number): Instruction => ({
    type,
    code: typePrefix(type) + key,
    apply: (frame: Frame) => {
        const a = frame.stack.pop();
        const b = frame.stack.pop();
        frame.stack.push({ type, value: ope(a.value, b.value) });
        frame.next();
    },
});

const typedUnaryOperation = (type: Type, key: string, ope: (a: number) => number): Instruction => ({
    type,
    code: typePrefix(type) + key,
    apply: (frame: Frame) => {
        const a = frame.stack.pop();
        const b = frame.stack.pop();
        frame.stack.push({ type, value: ope(a.value) });
        frame.next();
    },
});

const incr = (index: number, increment: number): Instruction => ({
    type: Type.Int,
    code: "iinc",
    apply: (frame: Frame) => {
        const { type, value } = frame.locals.get(index);
        frame.locals.set(index, { type, value: value + increment });
        frame.next();
    },
});

// Arithmetic
[Type.Int, Type.Long, Type.Float, Type.Double].forEach((type) => {
    const t = typePrefix(type);

    mathInstructions[`${t}add`] = () => typedBinaryOperation(type, "add", (a, b) => a + b);
    mathInstructions[`${t}sub`] = () => typedBinaryOperation(type, "sub", (a, b) => a - b);
    mathInstructions[`${t}mul`] = () => typedBinaryOperation(type, "mul", (a, b) => a * b);
    mathInstructions[`${t}div`] = () => typedBinaryOperation(type, "rem", (a, b) => a % b);
    mathInstructions[`${t}neg`] = () => typedUnaryOperation(type, "neg", (a) => - a);

    mathInstructions.iinc = (args: any[]) => {
        const index = parseInt(args[0], 10);
        const increment = parseInt(args[1], 10);
        return incr(index, increment);
    };

});
