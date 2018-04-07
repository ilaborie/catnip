import { Frame } from "./Frame";
import { Instruction } from "./input";
import { Value } from "./runtime";

export interface Constant {
    index: number;
    type: string;
    value: string;
}

export enum Type {
    Constant,
    // Numeric
    Int,
    Long,
    Float,
    Double,
    Char,
    Short,
}

export function typePrefix(type: Type): string {
    switch (type) {
        case Type.Int:
            return "i";
        case Type.Long:
            return "l";
        case Type.Float:
            return "f";
        case Type.Double:
            return "d";
        case Type.Char:
            return "c";
        case Type.Short:
            return "s";
        default:
            throw new Error(`Unexpected type ${type}`);
    }
}

export interface Instruction {
    type?: Type;
    code: string;
    apply: (frame: Frame) => void;
}

export interface InstructionInstance {
    position: number;
    instruction: Instruction;
    args: any[];
}

export interface InstructionBuilder {
    [index: string]: (args: any[]) => Instruction;
}

export interface MethodBody {
    stack: number;
    locals: number;
    args_size: number;
    code: InstructionInstance[];

    eval(): Value;
}
