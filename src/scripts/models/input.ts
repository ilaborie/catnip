import {Instruction} from "./input";
import {Frame, Value} from "./runtime";

export function TODO<T>(): T {
    throw new Error(`Not Implemented`);
}

export interface Constant {
    index: number;
    type: string;
    value: string;
}

export enum Type {
    Int,
    // ...
}

export function typePrefix(type: Type): string {
    switch (type) {
        case Type.Int:
            return "i";
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

export interface MethodBody {
    stack: number;
    locals: number;
    args_size: number;
    code: InstructionInstance[];

    eval(): Value;
}
