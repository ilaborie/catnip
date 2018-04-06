import {Constant, MethodBody} from "../models/input";

export interface MethodParser {
    parse(
        constantPool: Constant[],
        stack: number,
        locals: number,
        args_size: number,
        input: string): MethodBody;
}

export interface ConstantPoolParser {
    parse(input: string): Constant[];
}
