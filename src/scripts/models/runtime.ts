import { Type } from "./input";

export interface Value {
    type: Type;
    value: any;
}

export interface Frame {
    stack: OperandStack;
    vars: LocalVariables;
}

export interface LocalVariables {
    get(i: number): Value;
    set(i: number, value: Value): void;
}

export interface OperandStack {
    list(): Value[];
    push(value: Value): void;
    pop(): Value;
    peek(): Value;
}
